from ast import keyword
from bs4 import BeautifulSoup
from cv2 import add
import requests
from datetime import datetime
import re
import json

def get_tenpo():
    d = datetime.today().strftime("%Y%m%d")
    keyword = "コメダ珈琲"
    url = f"https://r.gnavi.co.jp/area/jp/rs/?date={d}&fw={keyword}"
    res = requests.get(url)
    s = BeautifulSoup(res.content, "html.parser")
    p = s.select(".style_pages__Y9bbR > li")[10].select("a")[0].get("href")
    pages = re.search("\d+$", p).group()

    tenpo_url = {}
    for i in range(int(pages)): 
        res = requests.get(f"{url}&p={i}")
        s = BeautifulSoup(res.content, "html.parser")

        tenpo = s.select(".style_resultRestaurant__WhVwP > div")[
            1].select(".style_restaurant__SeIVn")
        
        for i in tenpo:
            turl = i.find("a").get("href")
            name = i.find("h2").text
            tenpo_url[name] = turl

    with open(f"{keyword}.json", "w") as f:
        json.dump(tenpo_url, f, ensure_ascii=False)


j = "コメダ珈琲"
with open(f'{j}.json', 'r') as f:
   t = json.load(f)

summary = {}
for i in list(t.values())[:2]:
    res = requests.get(i)
    s = BeautifulSoup(res.content, "html.parser")
    base = s.select_one("#info-table").find_all("tr")
    
    name = s.select_one("#info-name").text # 店舗名
    address_link = s.select_one("#info-table-map-link").find("a").get("href") # 地図リンク
    address = base[2].select_one(".region").text # 住所
    i # リンク

print(summary)

# with open(f"{keyword}_data.json", "w") as f:
#     json.dump(summary, f, ensure_ascii=False)
