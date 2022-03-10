# TQL CTF 2022 - A More Secure Pastebin

##	Description

The last Pastebin is not safe. So here is a more secure Pastebin. Go for flag!

**This is a patched version**



##	Introduction for setup

1. Please generate server keys and then put them under the `./proxy` directory.
2. `docker-compose up -d --build`
3. Bot listen at localhost:4000 and web app listens at https://localhost:11001



##	Writeup

Based on Tom's wonderful report: [Partial report contents leakage - via HTTP/2 concurrent stream handling](https://hackerone.com/reports/493176)

[Writeup for A More Secure Pastebin - Practical Timeless Timing in Browser](https://blog.zeddyu.info/2022/02/21/2022-02-21-PracticalTimingTimeless/)

