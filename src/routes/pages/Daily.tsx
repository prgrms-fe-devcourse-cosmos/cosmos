import DailySpaceimage from '../../components/daily/DailySpaceimage';
import DailyNews from '../../components/daily/DailyNews';
import DailyCalendar from '../../components/daily/DailyCalendar';

export default function Daily() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* 상단 */}
      <div className="flex-1 flex justify-center items-start pt-16">
        <DailySpaceimage />
      </div>

      {/* 가운데 */}
      <div className="flex-1  flex justify-center items-start pt-24">
        <DailyNews />
      </div>

      {/* 하단 */}
      <div className="flex-1 flex justify-center items-start pt-24 pb-16">
        <DailyCalendar />
      </div>
    </div>
  );
}
