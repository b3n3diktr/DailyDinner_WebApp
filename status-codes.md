Status Codes and Messages
=======
## 20x Success Codes

- **201**: Registration successful. Check your email to activate your account.
- **202**: Account activated successfully.

## 43x Client Error Codes

- **431**: Invalid email address.
- **432**: Email address already registered.
- **433**: Username already exists.

## 41x Authentication Error Codes

- **411**: Invalid email or password.
- **412**: Account is not activated. Please check your email for activation link.
- **413**: Invalid email or password.

## 50x Server Error Codes

- **501**: Error sending activation email. Please try again.
- **502**: Error registering user. Error: {error.message}
- **503**: Server error. Error: {error.message}
- **504**: Internal server error. Error: {error.message}
- **505**: Token has expired. Error: {error.message}
- **506**: Invalid token. Error: {error.message}
- **507**: Internal server error. Error: {error.message}
