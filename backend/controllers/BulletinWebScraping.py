import requests
from bs4 import BeautifulSoup
import json
from azure.storage.blob import BlobServiceClient
import os
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle




# Azure Blob Storage connection string
connect_str = " "
bulletin_container_name = "bulletinpdfs"
stocks_container_name = "stocks"
crypto_container_name = "crypto"

holidays = [
    datetime(2024, 1, 1),
    datetime(2024, 4, 9), datetime(2024, 4, 10), datetime(2024, 4, 11), datetime(2024, 4, 12),
    datetime(2024, 4, 23),
    datetime(2024, 5, 1),
    datetime(2024, 5, 19),
    datetime(2024, 6, 15), datetime(2024, 6, 16), datetime(2024, 6, 17), datetime(2024, 6, 18), datetime(2024, 6, 19),
    datetime(2024, 7, 15),
    datetime(2024, 8, 30),
    datetime(2024, 10, 29)
]

def create_crypto_pdf(crypto_data, file_name):
    # Create the PDF document
    doc = SimpleDocTemplate(file_name, pagesize=landscape(letter))
    elements = []

    # Define the table data
    data = [['Rank', 'Name', 'Symbol', 'Current Price', 'Market Cap', 'Total Volume', '24h High', '24h Low']]
    for coin in crypto_data:
        data.append([
            coin.get('market_cap_rank', 'N/A'),
            coin.get('name', 'N/A'),
            coin.get('symbol', 'N/A'),
            f"${coin.get('current_price', 'N/A')}",
            f"${coin.get('market_cap', 'N/A')}",
            f"${coin.get('total_volume', 'N/A')}",
            f"${coin.get('high_24h', 'N/A')}",
            f"${coin.get('low_24h', 'N/A')}"
        ])

    # Create the table
    table = Table(data, repeatRows=1)

    # Add style to the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('ROWHEIGHT', (0, 0), (-1, -1), 20)  # Adjust row height if needed
    ])
    table.setStyle(style)

    # Add the table to the elements
    elements.append(table)

    # Build the PDF
    doc.build(elements)

def upload_crypto_pdf_to_blob(pdf_file_name, container_name):
    with open(pdf_file_name, 'rb') as data:
        upload_pdf_to_blob(data.read(), pdf_file_name, container_name)
def download_denizbank_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://www.denizyatirim.com/ResearchNotes/DailyNewsletter"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        headers = soup.find_all('h3', class_='title')
        for header in headers:
            if date_str in header.text:
                button = header.find_next('button', class_='modal-button')
                if button:
                    detail_url = button['data-ajax-href']
                    detail_response = requests.get(f"https://www.denizyatirim.com/{detail_url}")
                    if detail_response.status_code == 200:
                        detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                        pdf_link = detail_soup.find('a', class_='button big')['href']
                        pdf_url = f"https://www.denizyatirim.com{pdf_link}"
                        response = requests.get(pdf_url)
                        if response.status_code == 200:
                            return response.content, date_str
    return None, None

def download_yapikredi_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://www.yapikredi.com.tr/yapi-kredi-hakkinda/piyasa-bulteni"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        bulletin_links = soup.find_all('td', class_='firstTd')
        for link in bulletin_links:
            if date_str in link.text:
                pdf_link = link.find_next('a')['href']
                pdf_url = f"https://www.yapikredi.com.tr{pdf_link}"
                response = requests.get(pdf_url)
                if response.status_code == 200:
                    return response.content, date_str
    return None, None

def download_isbank_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://ekonomi.isbank.com.tr/tr/Sayfalar/haftalik-bulten.aspx"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        bulletin_links = soup.find_all('a', class_='linktotarget')
        for link in bulletin_links:
            if date_str in link.text:
                pdf_link = link['href']
                pdf_url = f"https://ekonomi.isbank.com.tr{pdf_link}"
                response = requests.get(pdf_url)
                if response.status_code == 200:
                    return response.content, date_str
    return None, None

def download_tacirler_bulletin(date):
    date_str = date.strftime('%d.%m.%Y')
    url = "https://tacirler.com.tr/arastirma/gunluk-bulten/"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        items = soup.find_all('div', class_='category-list-item')
        for item in items:
            if date_str in item.text:
                detail_link = item.find('a', href=True)['href']
                detail_url = f"{detail_link}"
                detail_response = requests.get(detail_url)
                if detail_response.status_code == 200:
                    detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                    pdf_link = detail_soup.find('a', class_='btn btn-p ra-pill px-3 dosya')['href']
                    pdf_url = f"{pdf_link}"
                    pdf_response = requests.get(pdf_url)
                    if pdf_response.status_code == 200:
                        return pdf_response.content, date_str
    return None, None

def create_stock_pdf(stock_data, file_name):
    c = canvas.Canvas(file_name, pagesize=letter)
    width, height = letter
    c.drawString(30, height - 40, "Daily Stock Data")
    y = height - 60

    for stock in stock_data:
        if y < 40:
            c.showPage()
            y = height - 40
        stock_text = (f"{stock['hisse_senedi_ismi']} ({stock['hisse_senedi_kodu']}): "
                      f"Son Fiyat: {stock['son_fiyat']} - "
                      f"Yüzdelik Degisim: {stock['yuzdelik_degisim']} - "
                      f"Hacim (TL): {stock['hacim_tl']}")
        c.drawString(30, y, stock_text)
        y -= 20

    c.save()

def upload_stock_pdf_to_blob(pdf_file_name, container_name):
    with open(pdf_file_name, 'rb') as data:
        upload_pdf_to_blob(data.read(), pdf_file_name, container_name)

def upload_to_blob(file_content, date_str, bank_name, container_name):
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=f"{bank_name} Daily Bulletin {date_str}.pdf")
    blob_client.upload_blob(file_content, overwrite=True)

def upload_pdf_to_blob(pdf_content, file_name, container_name):
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)
    blob_client.upload_blob(pdf_content, overwrite=True)

def upload_json_to_blob(json_data, file_name, container_name):
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)
    blob_client.upload_blob(json_data, overwrite=True)


today = datetime.today()

# Weekend and Holiday Check
if today.weekday() >= 5:
    print("Weekend")
elif today in holidays:
    print("Holiday")
else:
    
    # Download and upload Denizbank Bulletin
    denizbank_content, denizbank_date_str = download_denizbank_bulletin(today)
    if denizbank_content:
        upload_to_blob(denizbank_content, denizbank_date_str, "Denizbank", bulletin_container_name)
        print(f"Denizbank Daily Bulletin {denizbank_date_str}.pdf successfully uploaded.")

    # Download and upload Yapı Kredi Bulletin
    yapikredi_content, yapikredi_date_str = download_yapikredi_bulletin(today)
    if yapikredi_content:
        upload_to_blob(yapikredi_content, yapikredi_date_str, "Yapı Kredi", bulletin_container_name)
        print(f"Yapı Kredi Daily Bulletin {yapikredi_date_str}.pdf successfully uploaded.")

    # Download and upload İş Bankası Bulletin (only on Fridays)
    if today.weekday() == 4:  # 4 Friday
        isbank_content, isbank_date_str = download_isbank_bulletin(today)
        if isbank_content:
            upload_to_blob(isbank_content, isbank_date_str, "Isbank", bulletin_container_name)
            print(f"Isbank Weekly Bulletin {isbank_date_str}.pdf successfully uploaded.")
    else:
        print("Isbank Weekly Bulletin will be downloaded on Friday.")

    # Download and upload Tacirler Yatırım Bulletin
    tacirler_content, tacirler_date_str = download_tacirler_bulletin(today)
    if tacirler_content:
        upload_to_blob(tacirler_content, tacirler_date_str, "Tacirler", bulletin_container_name)
        print(f"Tacirler Daily Bulletin {tacirler_date_str}.pdf successfully uploaded.")
    
    # Stock Data Scraping and Uploading
    stock_url = "https://finans.mynet.com/borsa/hisseler/"
    stock_response = requests.get(stock_url)
    webpage_content = stock_response.content

    # Parse the webpage content
    soup = BeautifulSoup(webpage_content, 'html.parser')

    # Find the table containing the stock data
    table = soup.find('table', {'class': 'scrollable wfull search-table table-data'})

    # Check if the table was found
    if not table:
        print("Stock data table not found")
        exit()

    # Extract table rows
    rows = table.find('tbody').find_all('tr')

    # List to store the extracted data
    stock_data = []

    # Iterate through each row and extract data
    for row in rows:
        cells = row.find_all('td')
        stock = {
            'hisse_senedi_ismi': cells[0].text.strip(),
            'hisse_senedi_kodu': cells[0].find('a').get('title').split(' ')[0].strip(),
            'son_fiyat': cells[2].text.strip(),
            'yuzdelik_degisim': cells[3].text.strip(),
            'hacim_tl': cells[4].text.strip()
        }
        stock_data.append(stock)

    # Convert the data to JSON format
    stock_json_data = json.dumps(stock_data, indent=4, ensure_ascii=False)
    # Upload the JSON data to Blob
    stock_date_str = today.strftime('%d.%m.%Y')
    # Create PDF from stock data
    stock_pdf_file_name = f"Stocks_{stock_date_str}.pdf"
    create_stock_pdf(stock_data, stock_pdf_file_name)

    # Upload the PDF to Blob
    upload_stock_pdf_to_blob(stock_pdf_file_name, stocks_container_name)
    print(f"Stock data for {stock_date_str} successfully uploaded to Blob as PDF.")

    # Cryptocurrency Data Scraping and Uploading
    crypto_url = 'https://api.coingecko.com/api/v3/coins/markets'
    crypto_parameters = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 200,
        'page': 1,
        'sparkline': False
    }

    crypto_response = requests.get(crypto_url, params=crypto_parameters)
    crypto_data = crypto_response.json()

    # Create PDF from crypto data
    crypto_pdf_file_name = f"Crypto_{stock_date_str}.pdf"
    create_crypto_pdf(crypto_data, crypto_pdf_file_name)

    # Upload the PDF to Blob
    upload_crypto_pdf_to_blob(crypto_pdf_file_name, crypto_container_name)
    print(f"Cryptocurrency data for {stock_date_str} successfully uploaded to Blob as PDF.")

print(f"Script Path: {os.getcwd()}")
