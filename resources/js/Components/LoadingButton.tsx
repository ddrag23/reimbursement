
export default function LoadingButton({ className = '' }: { className?: string }) {
    return <button className={`btn ${className}`}>
        <span className="loading loading-spinner"></span>
        loading
    </button>
}
