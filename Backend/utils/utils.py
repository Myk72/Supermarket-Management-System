from passlib.context import CryptContext
from itsdangerous import URLSafeTimedSerializer
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv

from db.model.supplier import Supplier
import os

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
SECURITY_PASSWORD_SALT = os.getenv("SECURITY_PASSWORD_SALT")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True, 
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

async def send_email(email: str, token: str):
    link = f"http://localhost:5173/set-password/{token}"
    
    message = MessageSchema(
        subject="Welcome to Our Management System! Please Set Your Password",

        recipients=[email],
        body=f"""
            <h3>Welcome to Our Supermaket Management System!</h3>
            <p>Your account has been successfully created by the management team. 
            To get started, please set your password by clicking the button below:</p>
            <a href="{link}">{link}</a>
            <p>This link will expire in 30 minutes for security reasons.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Thank you for joining us!</p>
            <p>Best regards,</p>
            <p>The Management Team</p>
        """,
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)




async def send_purchase_email(supplier_email: str, supplier_name: str, items , expected_date, purchase_id):
    
    item_rows = "".join([
        f"""
        <tr>
            <td>{item.product_id}</td>
            <td>{item.quantity}</td>
            <td>{item.cost_price:.2f}</td>
        </tr>
        """ for item in items
    ])

    html_content = f"""
    <h3>New Purchase Order Notification</h3>
    <p>To the { supplier_name } Company, </p> 
    <p>We have placed a new purchase order with you. Below are the details:</p>

    <p><strong>Expected Delivery Date:</strong> {expected_date.strftime('%Y-%m-%d')}</p>
    <p><strong>Unique Purchase ID:</strong> {purchase_id}</p>

    <table border="1" cellpadding="8" cellspacing="0">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Cost Price</th>
            </tr>
        </thead>
        <tbody>
            {item_rows}
        </tbody>
    </table>

    <p>Please confirm receipt of this order at your earliest convenience.</p>

    <p>Best regards,<br/>The Management Team</p>
    """

    message = MessageSchema(
        subject="New Purchase Order Notification",
        recipients=[supplier_email],
        body=html_content,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)




def generate_token(email: str):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    return serializer.dumps(email, salt=SECURITY_PASSWORD_SALT)

def verify_token(token: str, expiration: int = 259200):
    serializer = URLSafeTimedSerializer(SECRET_KEY)
    try:
        return serializer.loads(token, salt=SECURITY_PASSWORD_SALT, max_age=expiration)
    except Exception:
        return None
