import { Search, Filter, AlertTriangle, Download } from 'lucide-react'
import { useState } from 'react'

const data = [
  { ref:'PAR00011', nom:'PARACETAMOL 500MG', unite:'Boite', qteAchat:500, qteVendue:415, stock:85, obs:'OK' },
  { ref:'AMO00007', nom:'AMOXICILLINE 500MG', unite:'Boite', qteAchat:200, qteVendue:192, stock:8, obs:'Stock bas' },
  { ref:'IBU00012', nom:'IBUPROFENE 400MG', unite:'Boite', qteAchat:300, qteVendue:258, stock:42, obs:'OK' },
  { ref:'OME00013', nom:'OMEPRAZOLE 20MG', unite:'Boite', qteAchat:180, qteVendue:142, stock:38, obs:'OK' },
  { ref:'ACY00002', nom:'ACYCLOVIR CP 200MG', unite:'Boite', qteAchat:50, qteVendue:46, stock:4, obs:'Stock bas' },
  { ref:'ACY00004', nom:'ACYCLOVIR DENK 200MG', unite:'Boite', qteAchat:30, qteVendue:30, stock:0, obs:'Rupture' },
  { ref:'ASP00009', nom:'ASPIRINE 500MG', unite:'Boite', qteAchat:250, qteVendue:185, stock:65, obs:'OK' },
  { ref:'ATE00010', nom:'ATENOLOL 50MG', unite:'Boite', qteAchat:100, qteVendue:68, stock:32, obs:'OK' },
  { ref:'ALB00006', nom:'ALBENDAZOLE 400MG', unite:'Plaquette', qteAchat:400, qteVendue:280, stock:120, obs:'OK' },
  { ref:'ACI00545', nom:'ACIDE FOLIQUE', unite:'Plaquette', qteAchat:300, qteVendue:250, stock:50, obs:'OK' },
  { ref:'ACU00001', nom:'ACUPAN INJ', unite:'Ampoule', qteAchat:200, qteVendue:119, stock:81, obs:'OK' },
  { ref:'AMP00008', nom:'AMPICILLINE INJ 1G', unite:'Flacon', qteAchat:150, qteVendue:105, stock:45, obs:'OK' },
]

export default function Stocks() {
  const [filtre, setFiltre] = useState('tous')
  const filtered = filtre === 'tous' ? data : filtre === 'bas' ? data.filter(p => p.stock > 0 && p.stock < 15) : data.filter(p => p.stock === 0)

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8}}>
        <div className="search-bar"><Search size={16} color="#64748b"/><input placeholder="Rechercher..."/></div>
        {['tous','bas','rupture'].map(f => <button key={f} className={`btn ${filtre===f?'btn-primary':'btn-outline'}`} onClick={()=>setFiltre(f)} style={{textTransform:'capitalize'}}>{f === 'tous' ? 'Tous' : f === 'bas' ? 'Stock bas' : 'Rupture'}</button>)}
      </div>
      <button className="btn btn-outline"><Download size={14}/> Export</button>
    </div>

    <div className="stats" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
      <div className="stat"><div className="label">Total produits</div><div className="value" style={{color:'#10b981'}}>{data.length}</div></div>
      <div className="stat"><div className="label">Stock bas</div><div className="value" style={{color:'#f59e0b'}}>{data.filter(p=>p.stock>0&&p.stock<15).length}</div></div>
      <div className="stat"><div className="label">En rupture</div><div className="value" style={{color:'#ef4444'}}>{data.filter(p=>p.stock===0).length}</div></div>
      <div className="stat"><div className="label">Valorisation</div><div className="value" style={{color:'#3b82f6'}}>4.2M Ar</div></div>
    </div>

    <div className="card">
      <div className="card-title"><AlertTriangle size={16}/> État du stock — {filtered.length} produits</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Référence</th><th>Désignation</th><th>Unité</th><th>Qté achetée</th><th>Qté vendue</th><th>Stock restant</th><th>Observation</th></tr></thead>
        <tbody>
          {filtered.map(p => <tr key={p.ref}>
            <td style={{fontFamily:'monospace',color:'#10b981'}}>{p.ref}</td>
            <td style={{fontWeight:500}}>{p.nom}</td>
            <td>{p.unite}</td>
            <td style={{color:'#3b82f6'}}>{p.qteAchat}</td>
            <td style={{color:'#a855f7'}}>{p.qteVendue}</td>
            <td style={{fontWeight:700,color:p.stock===0?'#ef4444':p.stock<15?'#f59e0b':'#10b981'}}>{p.stock}</td>
            <td><span className={`badge ${p.obs==='OK'?'b-g':p.obs==='Stock bas'?'b-y':'b-r'}`}>{p.obs}</span></td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>
  </>
}
