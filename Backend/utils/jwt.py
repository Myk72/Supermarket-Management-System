import os
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_EXPIRATION_TIME = int(os.getenv("JWT_EXPIRATION_DAYS", "1"))


def generate_cookie_token(data):
    encode = data.copy()
    expire = datetime.now(timezone.utc) + (timedelta(days=JWT_EXPIRATION_TIME))
    encode.update({"exp": expire})
    return jwt.encode(encode, SECRET_KEY, algorithm="HS512")

def verify_cookie_token(token):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS512"])
    except JWTError:
        return None
