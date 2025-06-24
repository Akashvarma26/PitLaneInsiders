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
def get_driver_telemetry(year: int, grand_prix: str, session_type: str, driver_code: str):
    """
    Get telemetry data for a driver's fastest lap in a session.
    Returns a list of telemetry points including speed, throttle, Gears, brake, rpm, drs, and distance.
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
    Get lap-by-lap performance data for a specific driver.
    Includes lap times, sector times, tyre compounds, and stint info.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    laps = DataFrame(session.laps.pick_drivers(driver_code.upper()).pick_quicklaps()).drop(["Driver","DriverNumber","PitOutTime","PitInTime","Team"])
    return laps

# Pitstop Data mcp tool
@server.tool()
def get_pit_stop_data(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Get pit stop data for all drivers in a session.
    Returns lap number, pit out time, compound, and stint.
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
    Get pit stint summary for a specific driver.
    Includes compound, start lap, end lap, and lap count.
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
    Get a brief information of the session metadata.
    Includes event name, location, all sessions and dates.
    """
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    return dict(session.event)

# Weather data for a session mcp tool
@server.tool()
def weather_data(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Get a brief weather data of the session.
    Includes most of weather parameters related to rain, wind, temperatures, pressure, etc.
    """    
    session = fastf1.get_session(year, grand_prix, session_type)
    session.load()
    return DataFrame(session.weather_data)

# Position Changes data mcp tool
@server.tool()
def get_position_changes(year: int, grand_prix: str, session_type: str) -> DataFrame:
    """
    Get lap-by-lap driver positions as a Polars DataFrame.
    Rows = laps, Columns = drivers, Values = positions
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