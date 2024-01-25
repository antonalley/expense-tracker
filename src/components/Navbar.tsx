import "../styles/Navbar.css"

export default function Navbar(){
    
    return (
        <div id="Navbar">
            <a className="unlink" href="/home"><div className="page unlink">Home</div></a>
            <a className="unlink" href="/dashboard"><div className="page unlink">Dashboard</div></a>
            <a className="unlink" href="/history"><div className="page unlink">History</div></a>
            <a className="unlink" href="/login"><div className="page unlink">Login/Logout</div></a>
        </div>
    )
}