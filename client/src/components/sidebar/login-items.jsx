export function LoginItem({ logo, name, email, isActive, onSelect }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
      }`}
      onClick={onSelect}
    >
      <div className="h-10 w-10 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center">
        <img src={logo || "/placeholder.svg"} alt={name} className="h-6 w-6 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className={`text-sm truncate ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {email}
        </div>
      </div>       
    </div>
  )
}