import { BarChart3, TrendingUp, Download, Building2, ShoppingCart } from 'lucide-react'

export default function Rapports() {
  return <>
    <div className="stats" style={{gridTemplateColumns:'repeat(4,1fr)',marginBottom:24}}>
      <div className="stat"><div className="label">CA total (Juin)</div><div className="value" style={{color:'#10b981'}}>218.5M Ar</div><div className="sub" style={{color:'#22c55e'}}>+8% vs Mai</div></div>
      <div className="stat"><div className="label">CA Sociétés</div><div className="value" style={{color:'#a855f7'}}>205.9M Ar</div><div className="sub" style={{color:'#94a3b8'}}>94% du CA</div></div>
      <div className="stat"><div className="label">CA Civil</div><div className="value" style={{color:'#3b82f6'}}>12.6M Ar</div><div className="sub" style={{color:'#94a3b8'}}>6% du CA</div></div>
      <div className="stat"><div className="label">Marge brute</div><div className="value" style={{color:'#f59e0b'}}>32.4M Ar</div><div className="sub" style={{color:'#22c55e'}}>Taux: 14.8%</div></div>
    </div>

    <div className="grid2">
      <div className="card">
        <div className="card-title"><Building2 size={16}/> CA par société — Juin 2026</div>
        {[
          { nom:'Société Alpha', montant:'205 912 490', pct:94 },
          { nom:'Société Beta', montant:'8 450 200', pct:4 },
          { nom:'Société Gamma', montant:'4 187 500', pct:2 },
        ].map((s,i) => <div key={i} style={{marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}>
            <span style={{fontWeight:500}}>{s.nom}</span>
            <span style={{color:'#10b981'}}>{s.montant} Ar</span>
          </div>
          <div style={{background:'#0a1628',borderRadius:4,height:8}}>
            <div style={{background:'#10b981',height:'100%',borderRadius:4,width:`${s.pct}%`}}/>
          </div>
        </div>)}
      </div>

      <div className="card">
        <div className="card-title"><TrendingUp size={16}/> Évolution CA (6 derniers mois)</div>
        {[
          { mois:'Janvier', montant:165 },
          { mois:'Février', montant:172 },
          { mois:'Mars', montant:188 },
          { mois:'Avril', montant:195 },
          { mois:'Mai', montant:202 },
          { mois:'Juin', montant:218 },
        ].map((m,i) => <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
          <span style={{fontSize:12,color:'#64748b',width:60}}>{m.mois}</span>
          <div style={{flex:1,background:'#0a1628',borderRadius:4,height:20}}>
            <div style={{background:`linear-gradient(90deg,#059669,#10b981)`,height:'100%',borderRadius:4,width:`${(m.montant/220)*100}%`,display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:8}}>
              <span style={{fontSize:10,fontWeight:600}}>{m.montant}M</span>
            </div>
          </div>
        </div>)}
      </div>

      <div className="card">
        <div className="card-title"><ShoppingCart size={16}/> Top 10 médicaments vendus — Juin</div>
        <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>#</th><th>Médicament</th><th>Qté</th><th>CA</th></tr></thead>
          <tbody>
            {[
              { nom:'PARACETAMOL 500MG', qte:342, ca:'855 000' },
              { nom:'AMOXICILLINE 500MG', qte:287, ca:'1 291 500' },
              { nom:'IBUPROFENE 400MG', qte:198, ca:'693 000' },
              { nom:'OMEPRAZOLE 20MG', qte:156, ca:'1 092 000' },
              { nom:'ASPIRINE 500MG', qte:134, ca:'402 000' },
            ].map((p,i) => <tr key={i}>
              <td style={{color:'#10b981',fontWeight:600}}>{i+1}</td>
              <td style={{fontWeight:500}}>{p.nom}</td>
              <td>{p.qte}</td>
              <td style={{fontWeight:600}}>{p.ca} Ar</td>
            </tr>)}
          </tbody>
        </table>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Download size={16}/> Exporter les rapports</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {['Rapport mensuel complet','État de stock global','CA par société','Historique des ventes','Liste des produits','Mouvements de stock'].map((r,i) =>
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:'rgba(16,185,129,.03)',borderRadius:8,border:'1px solid rgba(30,58,95,.3)'}}>
              <span style={{fontSize:13}}>{r}</span>
              <div style={{display:'flex',gap:4}}>
                <button className="btn btn-outline" style={{padding:'4px 8px',fontSize:11}}>PDF</button>
                <button className="btn btn-outline" style={{padding:'4px 8px',fontSize:11}}>Excel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
}
