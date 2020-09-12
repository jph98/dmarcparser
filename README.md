# DMarc Parser

This is a simple DMARC aggregate parser for looking at problems with email deliverability.  This supports only the aggregate reports sent via email and outputs a table with the following information:



## Getting Started with DMARC

You'll need a DNS TXT record with the following

```
Name: _dmarc.domain.com	
Value: "v=DMARC1; p=none; rua=mailto:dmarc@domain.com; ruf=mailto:dmarc@domain.com; pct=100"
```

The email address codes are as follows:

* rua - aggregate reports
* ruf - forensic reports

The definitive explanation can be found here - https://dmarc.org/

n.b. This email account and domain must exist and allow inbound email for the reports to be sent to you.



## Interpreting the Reports

Reading a DMARC Report
https://www.validity.com/how-to-read-your-first-dmarc-reports-part-1/

Forensic Reports
https://www.validity.com/how-to-read-your-first-dmarc-reports-part-2/