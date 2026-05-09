# EmailJS Configuration Guide

## ✅ Current Setup

Your portfolio has been updated with a fixed EmailJS integration. Emails from the "EMAIL ME" feature will now be sent to **dhore956@gmail.com**.

### What Changed

1. **Removed duplicate initialization** - EmailJS is now initialized once at module level
2. **Added loading state** - Button shows "Sending..." while email is being sent
3. **Fixed email delivery** - Emails are now sent using proper template parameters with your email address
4. **Improved UX** - Button is disabled during submission and has visual feedback

## 📋 Configuration Details

- **Service ID**: `service_00528jt`
- **Template ID**: `template_d5qw1sc`
- **Public Key**: `EQgBmJfWlBESpiuQk`
- **Recipient Email**: `dhore956@gmail.com` (from `src/data/constants.js`)

## 🔧 How It Works

### Email Form Fields
- `from_email` - Visitor's email address
- `from_name` - Visitor's name
- `subject` - Message subject
- `message` - Message content
- `to_email` - Your email (dhore956@gmail.com) - automatically added

### EmailJS Template (`template_d5qw1sc`)

Your template should be configured to:
1. Accept the above template variables
2. Send emails to the `{{to_email}}` variable (your email)
3. Use `{{from_email}}` and `{{from_name}}` for reply information

**Template Example** (update this in EmailJS dashboard):

```
Subject: New Message from {{from_name}}: {{subject}}

From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

## ✨ New Features

- **Loading State**: Button displays "Sending..." during submission
- **Fallback Mechanism**: If EmailJS fails, opens user's email client as backup
- **Error Handling**: Console logs errors for debugging
- **Hover Effects**: Button has smooth hover animation

## 🚀 Testing

To test the email functionality:

1. Run `npm start` to start the development server
2. Scroll to the Contact section
3. Fill in the form with test data
4. Click "Send"
5. You should receive the email at dhore956@gmail.com

## ⚠️ Important: Update EmailJS Template

**Action Required**: Log into your EmailJS dashboard and verify/update the template `template_d5qw1sc`:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Navigate to Email Templates
3. Edit template `template_d5qw1sc`
4. Ensure it includes these variables:
   - `{{to_email}}` - Recipient (your email)
   - `{{from_name}}` - Sender name
   - `{{from_email}}` - Sender email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email body

5. **Set the recipient email to**: `dhore956@gmail.com` or use `{{to_email}}`

## 🐛 Troubleshooting

If emails aren't arriving:

1. **Check EmailJS Status**: Go to EmailJS dashboard and verify service is active
2. **Verify Template**: Ensure template variables match the code
3. **Check Spam Folder**: Sometimes emails land in spam
4. **View Logs**: Check browser console (F12) for error messages
5. **Test Credentials**: Use the EmailJS test email feature in the dashboard

## 📝 Notes

- The public key is exposed in the code (this is normal for frontend EmailJS usage)
- Never share your EmailJS private keys
- Consider adding rate limiting in production
- Monitor EmailJS quota usage in the dashboard

---

For more help, visit [EmailJS Documentation](https://www.emailjs.com/docs/)
