import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, ArrowDownToLine, ShoppingCart, Building2, FileText, ClipboardCheck, Users, BarChart3, Settings, LogOut, Search, Bell, Pill, Menu, X } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Produits from './pages/Produits'
import Entrees from './pages/Entrees'
import VenteCivil from './pages/VenteCivil'
import VenteSociete from './pages/VenteSociete'
import Societes from './pages/Societes'
import Facturation from './pages/Facturation'
import EtatControle from './pages/EtatControle'
import Stocks from './pages/Stocks'
import Rapports from './pages/Rapports'
import Parametres from './pages/Parametres'

const menu = [
  { path:'/', label:'Tableau de bord', icon: LayoutDashboard },
  { section:'STOCK' },
  { path:'/produits', label:'Produits', icon: Package },
  { path:'/entrees', label:'Entrées', icon: ArrowDownToLine },
  { path:'/stocks', label:'État du stock', icon: BarChart3 },
  { section:'VENTES' },
  { path:'/vente-civil', label:'Vente Civil', icon: ShoppingCart },
  { path:'/vente-societe', label:'Vente Société', icon: Building2 },
  { section:'SOCIÉTÉS' },
  { path:'/societes', label:'Sociétés & Travailleurs', icon: Users },
  { path:'/facturation', label:'Facturation', icon: FileText },
  { path:'/etat-controle', label:'État de contrôle', icon: ClipboardCheck },
  { section:'SYSTÈME' },
  { path:'/rapports', label:'Rapports', icon: BarChart3 },
  { path:'/parametres', label:'Paramètres', icon: Settings },
]

const titles = {
  '/':'Tableau de bord', '/produits':'Produits', '/entrees':'Entrées de stock',
  '/stocks':'État du stock', '/vente-civil':'Vente Civil', '/vente-societe':'Vente Société',
  '/societes':'Sociétés & Travailleurs', '/facturation':'Facturation Société',
  '/etat-controle':'État de contrôle', '/rapports':'Rapports', '/parametres':'Paramètres'
}

export default function App() {
  const nav = useNavigate()
  const loc = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)
  const goTo = (path) => { nav(path); setMobileMenu(false); }
  return <div className="app">
    {mobileMenu && <div className="sidebar-overlay" onClick={()=>setMobileMenu(false)}/>}
    <aside className={`sidebar${mobileMenu?' open':''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon"><Pill size={22}/></div>
        <div><div className="logo-text">SALAMA</div><div className="logo-sub">Dépôt de médicaments</div></div>
        <button className="mobile-close" onClick={()=>setMobileMenu(false)}><X size={20}/></button>
      </div>
      <nav>
        {menu.map((m,i) => m.section
          ? <div key={i} className="nav-section">{m.section}</div>
          : <button key={m.path} className={`nav-item${loc.pathname===m.path?' active':''}`} onClick={()=>goTo(m.path)}>
              <m.icon size={18}/> {m.label}
            </button>
        )}
      </nav>
      <div className="sidebar-footer">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,color:'#64748b',cursor:'pointer'}}>
          <LogOut size={14}/> Déconnexion
        </div>
        <div style={{marginTop:8,fontSize:10,color:'#334155'}}>SALAMA v1.0 — Datalio</div>
      </div>
    </aside>
    <div className="main">
      <div className="topbar">
        <div style={{display:'flex',alignItems:'center',gap:12}}><button className="mobile-menu-btn" onClick={()=>setMobileMenu(true)}><Menu size={22}/></button><h1>{titles[loc.pathname]||'SALAMA'}</h1></div>
        <div className="topbar-actions">
          <div className="search-bar hide-mobile"><Search size={16} color="#64748b"/><input placeholder="Rechercher un médicament..."/></div>
          <button className="btn btn-outline" style={{position:'relative'}}><Bell size={16}/><span style={{position:'absolute',top:4,right:4,width:8,height:8,background:'#ef4444',borderRadius:'50%'}}/></button>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard onNavigate={nav}/>}/>
          <Route path="/produits" element={<Produits/>}/>
          <Route path="/entrees" element={<Entrees/>}/>
          <Route path="/stocks" element={<Stocks/>}/>
          <Route path="/vente-civil" element={<VenteCivil/>}/>
          <Route path="/vente-societe" element={<VenteSociete/>}/>
          <Route path="/societes" element={<Societes/>}/>
          <Route path="/facturation" element={<Facturation/>}/>
          <Route path="/etat-controle" element={<EtatControle/>}/>
          <Route path="/rapports" element={<Rapports/>}/>
          <Route path="/parametres" element={<Parametres/>}/>
        </Routes>
      </div>
    </div>
  </div>
}
