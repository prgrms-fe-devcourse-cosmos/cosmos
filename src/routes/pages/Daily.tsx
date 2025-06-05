import DailySpaceimage from '../../components/Daily/DailySpaceimage';
import DailyNews from '../../components/Daily/DailyNews';
import DailyCalendar from '../../components/Daily/DailyCalendar';

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
      <div className="flex-1 flex justify-center items-start pt-24">
        <DailyCalendar />
      </div>
    </div>
  );
}
