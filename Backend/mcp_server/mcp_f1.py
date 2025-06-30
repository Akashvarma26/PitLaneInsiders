# Importing required libraries
from polars.dataframe import DataFrame
from mcp.server.fastmcp import FastMCP
import fastf1
import os

# Enabling caching to improve response times and reduce latency
cache_path = "cache"
os.makedirs(cache_path, exist_ok=True)
fastf1.Cache.enable_cache(cache_path)

# Server initializing in 8001 port
server = FastMCP("Formula One Data Engineer",host="127.0.0.1",port=8001)

# Driver's Telemetry Data mcp tool
@server.tool()
def get_driver_telemetry(year: int, grand_prix: str, session_type: str, driver_code: str) -> DataFrame:
    """
    Fetches telemetry data for a driver's fastest lap in a session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix (e.g., 'Monza'),
        session_type (str): Type of session ('FP1', 'Q', 'R', etc.),
        driver_code (str): 3-letter driver code (e.g., 'VER')

    Returns:
        DataFrame: Telemetry data including speed, throttle, brake, gear, rpm, drs, and distance per point.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    fastest_lap = session.laps.pick_drivers(driver_code.upper()).pick_fastest()
    telemetry = DataFrame(fastest_lap.get_car_data().add_distance()).drop(["Source"])
    return telemetry

# Driver's Lap Data mcp tool
@server.tool()
def get_driver_lap_data(year: int, grand_prix: str, session_type: str, driver_code: str) -> DataFrame:
    """
    Retrieves lap-by-lap performance data for a specific driver.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session ('FP2', 'Q', 'R', etc.),
        driver_code (str): 3-letter driver code

    Returns:
        DataFrame: Quick laps with lap times, sector times, tyre compound, and stint information.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    laps = DataFrame(session.laps.pick_drivers(driver_code.upper()).pick_quicklaps()).drop(["Driver","DriverNumber","PitOutTime","PitInTime","Team"])
    return laps

# Pitstop Data mcp tool
@server.tool()
def get_pit_stop_data(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Returns pit stop information for all drivers in a session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session

    Returns:
        DataFrame: Pit stop details including driver, lap number, pit out time, compound used, and stint number.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    laps = session.laps
    pit_stops = laps[laps['PitOutTime'].notnull()]
    return DataFrame(pit_stops[["Driver", "LapNumber", "PitOutTime", "Compound", "Stint"]])

# Driver's Pit Stints data mcp tool
@server.tool()
def get_pit_stints(year: int, grand_prix: str, session_type: str, driver_code: str) -> DataFrame:
    """
    Provides a summary of a driver's tyre stints during a session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session,
        driver_code (str): 3-letter driver code

    Returns:
        DataFrame: Stint information including compound, start lap, end lap, and total laps in each stint.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    laps = session.laps.pick_driver(driver_code.upper())
    stint_info = laps.groupby("Stint")[["Compound", "LapNumber"]].agg({
        "Compound": "first",
        "LapNumber": ["min", "max", "count"]
    })
    stint_info.columns = ["Compound", "StartLap", "EndLap", "LapCount"]
    return DataFrame(stint_info.reset_index())

# Session information data mcp tool
@server.tool()
def get_session_info(year: int, grand_prix: str, session_type: str) -> dict:
    """
    Returns general metadata about the session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session

    Returns:
        dict: Metadata including event name, location, session dates, and other session-level information.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    return dict(session.event)

# Weather data for a session mcp tool
@server.tool()
def weather_data(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Returns weather conditions recorded during the session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session

    Returns:
        DataFrame: Weather data with parameters like temperature, humidity, rain, wind, pressure, and more.
    """   
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    return DataFrame(session.weather_data)

# Position Changes data mcp tool
@server.tool()
def get_position_changes(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Returns lap-by-lap position changes for all drivers in the session.

    Args:
        year (int): F1 season year,
        grand_prix (str): Name of the Grand Prix,
        session_type (str): Type of session

    Returns:
        DataFrame: Table showing driver positions per lap (rows = laps, columns = drivers, values = positions).
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    laps = session.laps[["Driver", "LapNumber", "Position"]]
    df_pandas = laps.pivot_table(
        index="LapNumber", columns="Driver", values="Position"
    ).sort_index().astype("Int64")
    return DataFrame(df_pandas.reset_index())

# To run server in the streamable http transport protocol
if __name__=="__main__":
    server.run(transport="streamable-http")