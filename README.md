## Example cron

```shell
# At 03:15 on every day-of-week from Monday through Friday.
15 3 * * 1-5 node ~/crontendance/main.js >> ~/logs/cron.log 2>&1
```
