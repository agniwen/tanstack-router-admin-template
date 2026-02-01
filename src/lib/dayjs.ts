import d from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';

// UTC 和时区支持
d.extend(utc);
d.extend(timezone);

// 相对时间（例如：3 hours ago）
d.extend(relativeTime);

// 时间段处理（例如：持续时间计算）
d.extend(duration);

// 时间范围判断
d.extend(isBetween);
d.extend(isSameOrBefore);
d.extend(isSameOrAfter);

// 星期相关
d.extend(weekday);
d.extend(isoWeek);

// 季度支持
d.extend(quarterOfYear);

// 高级格式化（例如：季度、周数等）
d.extend(advancedFormat);

// 设置默认语言为中文
d.locale('zh-cn');

export const dayjs = d;
