import { useState } from 'react'
import { Search, Plus, Minus, Trash2, Printer } from 'lucide-react'

const produits = [
  { ref:'PAR00011', nom:'PARACETAMOL 500MG', prix:2500, stock:85 },
  { ref:'AMO00007', nom:'AMOXICILLINE 500MG', prix:4500, stock:8 },
  { ref:'IBU00012', nom:'IBUPROFENE 400MG', prix:3500, stock:42 },
  { ref:'OME00013', nom:'OMEPRAZOLE 20MG', prix:7000, stock:38 },
  { ref:'ASP00009', nom:'ASPIRINE 500MG', prix:3000, stock:65 },
  { ref:'VIT00014', nom:'VITAMINE C 1000MG', prix:1500, stock:120 },
]

export default function VenteCivil() {
  const [panier, setPanier] = useState([
    { ref:'PAR00011', nom:'PARACETAMOL 500MG', prix:2500, qte:3 },
    { ref:'IBU00012', nom:'IBUPROFENE 400MG', prix:3500, qte:1 },
  ])
  const total = panier.reduce((s,p) => s + p.prix * p.qte, 0)

  return <div className="grid2">
    <div>
      <div className="card">
        <div className="card-title"><Search size={16}/> Rechercher un médicament</div>
        <div className="search-bar" style={{maxWidth:'100%',marginBottom:16}}><Search size={16} color="#64748b"/><input placeholder="Nom ou référence du médicament..."/></div>
        <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Réf</th><th>Médicament</th><th>Prix</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {produits.map(p => <tr key={p.ref}>
              <td style={{fontFamily:'monospace',fontSize:11,color:'#10b981'}}>{p.ref}</td>
              <td style={{fontWeight:500,fontSize:12}}>{p.nom}</td>
              <td style={{fontSize:12}}>{p.prix.toLocaleString()}</td>
              <td style={{color:p.stock<15?'#f59e0b':'#10b981',fontSize:12}}>{p.stock}</td>
              <td><button className="btn btn-primary" style={{padding:'4px 8px',fontSize:11}}><Plus size={12}/></button></td>
            </tr>)}
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <div>
      <div className="card">
        <div className="card-title" style={{color:'#10b981'}}>Panier — Vente Civil</div>
        {panier.length === 0 ? <div style={{textAlign:'center',color:'#475569',padding:40}}>Panier vide</div> :
        <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Médicament</th><th>P.U.</th><th>Qté</th><th>Total</th><th></th></tr></thead>
          <tbody>
            {panier.map((p,i) => <tr key={i}>
              <td style={{fontWeight:500,fontSize:12}}>{p.nom}</td>
              <td style={{fontSize:12}}>{p.prix.toLocaleString()}</td>
              <td>
                <div style={{display:'flex',alignItems:'center',gap:4}}>
                  <button className="btn btn-outline" style={{padding:2}}><Minus size={12}/></button>
                  <span style={{fontWeight:600,minWidth:24,textAlign:'center'}}>{p.qte}</span>
                  <button className="btn btn-outline" style={{padding:2}}><Plus size={12}/></button>
                </div>
              </td>
              <td style={{fontWeight:600,color:'#10b981',fontSize:12}}>{(p.prix*p.qte).toLocaleString()}</td>
              <td><button className="btn btn-outline" style={{padding:2,color:'#ef4444'}}><Trash2 size={12}/></button></td>
            </tr>)}
          </tbody>
        </table>
        </div>}

        <div style={{borderTop:'1px solid #1e3a5f',marginTop:16,paddingTop:16}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14}}><span style={{color:'#94a3b8'}}>Sous-total</span><span>{total.toLocaleString()} Ar</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:20,fontWeight:700}}><span>TOTAL</span><span style={{color:'#10b981'}}>{total.toLocaleString()} Ar</span></div>
        </div>

        <div className="form-grid" style={{marginTop:16}}>
          <div className="form-group"><label>Montant reçu</label><input type="number" placeholder="0" defaultValue={15000}/></div>
          <div className="form-group"><label>Mode de paiement</label><select><option>Espèces</option><option>Mobile Money</option><option>Virement</option></select></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:8,padding:'8px 0',borderTop:'1px solid #1e3a5f'}}>
          <span style={{color:'#94a3b8'}}>Monnaie à rendre</span>
          <span style={{fontWeight:700,color:'#f59e0b',fontSize:18}}>{(15000 - total).toLocaleString()} Ar</span>
        </div>
        <div style={{display:'flex',gap:8,marginTop:16}}>
          <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}}>Valider la vente</button>
          <button className="btn btn-outline"><Printer size={14}/> Ticket</button>
        </div>
      </div>
    </div>
  </div>
}
