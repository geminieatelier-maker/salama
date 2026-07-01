import { Package, AlertTriangle, ShoppingCart, Building2, TrendingUp, Clock, Pill, ThermometerSun } from 'lucide-react'

export default function Dashboard({ onNavigate }) {
  return <>
    <div className="stats">
      <div className="stat"><div className="label">Produits en stock</div><div className="value" style={{color:'#10b981'}}>592</div><div className="sub" style={{color:'#94a3b8'}}>48 catégories</div></div>
      <div className="stat"><div className="label">Alertes stock bas</div><div className="value" style={{color:'#f59e0b'}}>23</div><div className="sub" style={{color:'#ef4444'}}>8 en rupture</div></div>
      <div className="stat"><div className="label">Ventes civil ce mois</div><div className="value" style={{color:'#3b82f6'}}>156</div><div className="sub" style={{color:'#22c55e'}}>+12% vs mois dernier</div></div>
      <div className="stat"><div className="label">Ventes société</div><div className="value" style={{color:'#a855f7'}}>1 247</div><div className="sub" style={{color:'#94a3b8'}}>3 sociétés actives</div></div>
      <div className="stat"><div className="label">CA ce mois</div><div className="value" style={{color:'#f8fafc'}}>18.5M Ar</div><div className="sub" style={{color:'#22c55e'}}>Société: 15.2M | Civil: 3.3M</div></div>
      <div className="stat"><div className="label">Créances sociétés</div><div className="value" style={{color:'#ef4444'}}>42.8M Ar</div><div className="sub" style={{color:'#f59e0b'}}>Ouest Sucre: 28.5M</div></div>
      <div className="stat"><div className="label">Expirations proches</div><div className="value" style={{color:'#f59e0b'}}>15</div><div className="sub" style={{color:'#ef4444'}}>3 expirés</div></div>
      <div className="stat"><div className="label">Entrées ce mois</div><div className="value" style={{color:'#10b981'}}>89</div><div className="sub" style={{color:'#94a3b8'}}>Valeur: 8.2M Ar</div></div>
    </div>

    <div className="grid2">
      <div className="card">
        <div className="card-title"><ShoppingCart size={18}/> Dernières ventes société</div>
        <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Date</th><th>Travailleur</th><th>Société</th><th>Montant</th></tr></thead>
          <tbody>
            <tr onClick={()=>onNavigate('/vente-societe')}><td>01/07</td><td>RAKOTO Jean</td><td>Ouest Sucre</td><td style={{color:'#10b981'}}>45 600 Ar</td></tr>
            <tr onClick={()=>onNavigate('/vente-societe')}><td>01/07</td><td>RABE Marie</td><td>Ouest Sucre</td><td style={{color:'#10b981'}}>128 000 Ar</td></tr>
            <tr onClick={()=>onNavigate('/vente-societe')}><td>30/06</td><td>ANDRIA Paul</td><td>SIRAMA</td><td style={{color:'#10b981'}}>67 200 Ar</td></tr>
            <tr onClick={()=>onNavigate('/vente-societe')}><td>30/06</td><td>RASOA Hery</td><td>Ouest Sucre</td><td style={{color:'#10b981'}}>312 500 Ar</td></tr>
          </tbody>
        </table>
        </div>
      </div>

      <div>
        <div className="card">
          <div className="card-title"><AlertTriangle size={18}/> Alertes</div>
          <div className="alert alert-r"><ThermometerSun size={14}/> AMOXICILLINE 500mg expiré depuis 5 jours</div>
          <div className="alert alert-y"><Package size={14}/> PARACETAMOL 1000mg — stock bas (12 boîtes)</div>
          <div className="alert alert-y"><Clock size={14}/> Facturation Ouest Sucre — Juin en attente</div>
          <div className="alert alert-g"><Building2 size={14}/> SIRAMA — facture Mai payée</div>
        </div>
        <div className="card">
          <div className="card-title"><TrendingUp size={18}/> Top médicaments (société)</div>
          <div style={{fontSize:13,color:'#94a3b8'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(30,58,95,.3)'}}><span>PARACETAMOL 500mg</span><span style={{color:'#10b981'}}>342 unités</span></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(30,58,95,.3)'}}><span>AMOXICILLINE 500mg</span><span style={{color:'#10b981'}}>287 unités</span></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(30,58,95,.3)'}}><span>IBUPROFENE 400mg</span><span style={{color:'#10b981'}}>198 unités</span></div>
            <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><span>OMEPRAZOLE 20mg</span><span style={{color:'#10b981'}}>156 unités</span></div>
          </div>
        </div>
      </div>
    </div>
  </>
}
