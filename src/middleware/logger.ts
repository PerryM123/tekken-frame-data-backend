import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { serverLogger } from '../utils/serverLogger';
import { LOGGER_TYPE } from '../utils/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export const logger = (req, res, next) => {
  const timeStamp = dayjs().tz('Asia/Tokyo').format();
  const startTime = process.hrtime();
  const getDurationInMilliseconds = (startTime) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const timeDifference = process.hrtime(startTime);
    return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
  };
  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(startTime);
    serverLogger(
      LOGGER_TYPE.INFO,
      `[info][${timeStamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - - ${
        req.ip
      } - ${durationInMilliseconds.toLocaleString()} ms`
    );
  });
  next();
};
