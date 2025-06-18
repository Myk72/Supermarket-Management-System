# 🛒 Supermarket Management System

A complete solution for supermarket operations with real-time barcode scanning and secure connections.

## Features
- 🛒 Product & inventory management
- 💰 Sales processing with receipts
- 👥 Customer loyalty program
- 📦 Supplier tracking
- 📱 Mobile barcode scanner
- 🔄 Real-time updates
- 🔒 Secure HTTPS connections

---

## ✅ What This Project Does

This system helps supermarkets to:

- Add and manage products using barcodes
- Keep stock records and know when to reorder
- Track expiry dates of products
- Make sales and calculate total, tax, and discount
- Manage customers and give loyalty points
- Add discounts for special days or offers
- Handle returns and give refunds
- Buy items from suppliers and track purchases
- Manage employees and their shifts
- Allow employees to log in securely
- Scan barcodes from a mobile phone using the scanner app

---

## 💻 Technologies Used

| Feature         | Technology     |
|-----------------|----------------|
| Frontend        | React.js       |
| Backend         | FastAPI        |
| Database        | MySQL          |
| Real-time       | Socket.IO      |
| Barcode Scanner | React App (Mobile) |

---

## ⚙️ Installation & Setup

### 1. Clone the project

```bash
git clone https://github.com/Myk72/Supermarket-Management-System.git
cd supermarket-management-system

```

## How to Set Up

1. **Database**
   - Install MySQL
   - Create database

2. **Backend**
   - Install Python 3.8+
   - Run `pip install -r requirements.txt`
   - Run `openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365`
   - Start server with `uvicorn main:socket_app --host 0.0.0.0 --reload --ssl-keyfile=key.pem --ssl-certfile=cert.pem`

3. **Main Frontend**
   - Install Node.js
   - Run `npm install`
   - Start with `npm start`

4. **Scanner Frontend**
   - Open scanner folder
   - Run `npm install`
   - Start with `npm start`

## How to Use

1. Add products and set prices
2. Connect scanner phone to same WiFi
3. Scan items to make sales
4. View reports and stock levels
