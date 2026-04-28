# Cookie Policy

**Effective Date:** April 28, 2026

## 1. Introduction

This Cookie Policy explains how **SiteStatus** ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are, why we use them, and your rights to control our use of them.

## 2. What are Cookies?

Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.

## 3. How We Use Cookies

We use cookies for several reasons. Some cookies are required for technical reasons in order for our Service to operate, and we refer to these as "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Service.

## 4. Types of Cookies We Use

### 4.1. Strictly Necessary Cookies

These cookies are essential for the Service to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as logging in or setting your privacy preferences.

| Cookie Name             | Purpose                                                          | Duration                  |
| :---------------------- | :--------------------------------------------------------------- | :------------------------ |
| **`accessToken`**       | Used to authorize API requests and identify your active session. | 15 minutes (auto-renewed) |
| **`refreshToken`**      | Allows for secure session renewal without requiring a re-login.  | 30 days                   |
| **`SiteStatusConsent`** | Stores your preference regarding the use of analytics cookies.   | 365 days                  |

_Note: Authentication tokens (`accessToken` and `refreshToken`) are typically stored as **HttpOnly** cookies to protect against XSS attacks._

### 4.2. Analytics Cookies (Google Analytics 4)

We use these cookies to help us understand how our Service is being used and how effective our marketing campaigns are. These are only activated if you provide explicit consent.

| Cookie Name    | Purpose                                                           | Duration |
| :------------- | :---------------------------------------------------------------- | :------- |
| **`_ga`**      | Main identifier for Google Analytics to distinguish unique users. | 2 years  |
| **`_ga_[ID]`** | Used to persist session state within Google Analytics 4.          | 2 years  |

## 5. Google Consent Mode v2

SiteStatus has implemented **Google Consent Mode v2**. If you choose to "Decline" analytics:

- No identifying analytics cookies (like `_ga`) will be created on your device.
- Google Analytics will only receive anonymized technical "pings" for basic traffic modeling without identifying you personally.

## 6. Third-Party Cookies

When you sign in using **OAuth (Google One Tap or GitHub)**, these third-party providers may set their own cookies on your device to complete the authentication process. We do not control these cookies; please refer to the respective privacy policies of Google and GitHub for more information.

## 7. Session Security and Monitoring

To protect your account, we record technical information associated with your session cookies, such as:

- Your **User Agent** (Browser and OS).
- Your **Approximate Location** (Country and City).
  This allows you to identify and terminate unauthorized sessions via your dashboard.

## 8. How to Control Cookies

You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Banner. You can also set or amend your web browser controls to accept or refuse cookies.

If you choose to reject strictly necessary cookies, you may still use our website, though your access to some functionality and areas of our website (specifically the authenticated dashboard) will be restricted.

## 9. Updates to This Policy

We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.

## 10. Contact Us

If you have any questions about our use of cookies or other technologies, please email us at:
**Email:** support@sitestatus.dev
