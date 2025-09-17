"use client"

const ScoreCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  score: number;
  total?: number;
  color: string;
}> = ({ icon, title, score, total, color }) => (
  <div className="bg-white rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 duration-300 border border-gray-100">
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl ${color} mb-4`}>
      {icon}
    </div>
    <div className="text-2xl font-semibold text-gray-900 mb-1">
      {score}{total && `/${total}`}
    </div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

export default ScoreCard;