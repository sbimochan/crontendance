## Example cron

> At 03:15 on every day-of-week from Monday through Friday.

```sh
15 3 * * 1-5 cd ~/crontendance && node ~/crontendance/main.js >> ~/logs/cron.log 2>&1
```

if cloned in home directory. Change directory accordingly.
