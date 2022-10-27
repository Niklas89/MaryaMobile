import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { AnyObject } from "yup/lib/types";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key: any, value: any) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item: any) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > 5;
};

const get = async (key: AnyObject) => {
  try {
    const value: string | null = await AsyncStorage.getItem(prefix + key);
    const item = value != null ? JSON.parse(value) : null;

    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
