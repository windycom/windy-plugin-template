/**
 * Object containing timestamps and methods for given weather product
 */
import type { CalendarDay, MinifestObject, Weekday } from '@windy/Calendar.d';
import type { TimeFormatFunction } from '@windy/format.d';
import type { Products } from '@windy/rootScope.d';
import type { ISODateString, Path, Timestamp } from '@windy/types.d';
export type CalendarInitParams = Pick<Calendar, 'numOfHours' | 'minifestFile'> & {
    /**
     * Ident of product that this calendar is for
     */
    product: Products;
    /**
     * Optional latest timestamp (for use for offline mode for example)
     */
    lastTimestamp?: Timestamp;
};
export declare class Calendar {
    /**
     * Time formatting function
     */
    static readonly localeHours: TimeFormatFunction;
    static readonly weekdays: Weekday[];
    /**
     * Number of hours covered by this calendar
     */
    numOfHours: number;
    /**
     * Type of the calendare
     */
    type: 'historical' | 'mixed' | 'forecast';
    calendarHours: number;
    /**
     * Today midnigh in LT of user's computer
     */
    midnight: Date;
    /**
     * This midnight of other defined start of timeline
     */
    startOfTimeline: Date;
    /**
     * startOfTimeline in the form of timestamp
     */
    start: Timestamp;
    /**
     * startOfPremiumTimeline in the form of timestamp; null if it is free in whole range
     */
    premiumStart: Timestamp | null;
    /**
     * End of calendar timeline
     */
    endOfcalendar: Date;
    /**
     * endOfcalendar as timestamp
     */
    endOfCal: Timestamp;
    /**
     * endOfCal or latest timestamp, whiever is smaller
     */
    end: Timestamp;
    /**
     * Max timestamp value, usually same as end (should be updated later on basis of minifest)
     */
    maxTimestamp: Timestamp;
    /**
     * Array of calendayr days to be used in UI
     */
    days: CalendarDay[];
    /**
     * Array of timestamps that contain valid forecast
     */
    timestamps: Timestamp[];
    /**
     * Array of URL paths that equal to timestamps in a form of "2021/05/27/19"
     */
    paths: string[];
    /**
     * Minifest that led to construction of this instance
     */
    minifestFile: MinifestObject;
    /**
     * Is the minifest valid or emergency, created out of the air?
     */
    minifestValid: boolean;
    /**
     * Minifests's reference time is some non stndard format
     */
    refTime: string;
    /**
     * Minifests's reference time
     */
    refTimeTs: Timestamp;
    /**
     * Minifests's reference time
     */
    refTimeTxt: ISODateString;
    /**
     * Forecast update time
     */
    updateTs: Timestamp;
    /**
     * Forecast update time
     */
    updateTxt: ISODateString;
    constructor(params: CalendarInitParams);
    initProperties(): void;
    /**
     * Bound ts to be be within limit of calendar
     */
    boundTs(ts: Timestamp): Timestamp;
    /**
     * Finds closes valid path on the basis of timestamp
     */
    ts2path(ts: Timestamp): Path;
    /**
     * Creates timestamps out of the air, with 3h interval (fixed)
     */
    createTimestamps(): void;
    prepareTimesFromMinifest(minifest: MinifestObject): boolean;
    /**
     * Creates timestamps & paths arrays from minifest
     */
    createTimestampsFromMinifest(minifest: MinifestObject): boolean;
    /**
     * Return YYYY/MM/DD/HH or YYYYMMDDHH on a basis of provided date
     * we do not CHECK existence of path in minifest
     */
    static date2path(date: Date): Path;
    /**
     * Returns JavaScript date object corresponding
     * to provided path in a form YYYY/MM/DD/HH or YYYYMMDDHH
     */
    static path2date(path: string): Date;
    /**
     * Returns nice, human readable date string out of ts
     */
    static ts2string(ts: string | number): string;
    /**
     * Adds hours or days to date
     *
     * @example
     * date = this.add( new Date(), 13, 'days' )
     */
    static add(date: Date, x: number, what?: 'days' | 'hours' | undefined): Date;
    /**
     * Return nearest midnight
     */
    static getMidnight(): Date;
}
