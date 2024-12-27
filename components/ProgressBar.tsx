interface ProgressBarProps {
    progress: number // A value between 0 and 100
  }
  
  export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }
  