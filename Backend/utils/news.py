import feedparser

def get_all_f1_articles():
    rss_sources = [
        {
            "name": "Autosport",
            "url": "https://www.autosport.com/rss/f1/news/",
            "get_img": lambda entry: entry.links[1].href if len(entry.links) > 1 else None
        },
        {
            "name": "PlanetF1",
            "url": "https://www.planetf1.com/ps-rss",
            "get_img": lambda entry: entry.links[1].href if len(entry.links) > 1 else None
        },
        {
            "name": "Motorsport",
            "url": "https://www.motorsport.com/rss/f1/news/",
            "get_img": lambda entry: entry.links[1].href if len(entry.links) > 1 else None
        },
        {
            "name": "The Mirror",
            "url": "https://www.mirror.co.uk/sport/formula-1/?service=rss",
            "get_img": lambda entry: entry.media_content[0]['url'] if getattr(entry, 'media_content', None) else None
        }
    ]
    all_articles = []
    for source in rss_sources:
        feed = feedparser.parse(source["url"])
        for entry in feed.entries[:3]:  # Limit to 3 articles per source
            all_articles.append({
                "article": source["name"],
                "title": entry.title,
                "img": source["get_img"](entry),
                "link": entry.link,
                #"summary": entry.summary,
                #"published": entry.published
            })
    return all_articles