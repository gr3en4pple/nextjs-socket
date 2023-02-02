import moment from 'moment';

export const formatHumanReadableDate = (time: moment.MomentInput, format = 'DD MMM, hh:mm:ss') =>
  moment(time).format(format);
