import { useState } from 'react'
import { Search, Plus, Minus, Trash2, Building2, User, FileText } from 'lucide-react'

export default function VenteSociete() {
  const [societe] = useState('Société Alpha')
  const [travailleur] = useState({ matricule:'000234', section:'220', dpt:'Hospitalier', nom:'RAKOTO Jean Baptiste', type:'Permanent', embauche:'12/03/2018' })

  const panier = [
    { ref:'PAR00011', nom:'PARACETAMOL 500MG', prix:2500, qte:2 },
    { ref:'AMO00007', nom:'AMOXICILLINE 500MG', prix:4500, qte:1 },
    { ref:'OME00013', nom:'OMEPRAZOLE 20MG', prix:7000, qte:1 },
  ]
  const total = panier.reduce((s,p) => s + p.prix * p.qte, 0)

  return <>
    <div className="grid2" style={{marginBottom:20}}>
      <div className="card" style={{borderColor:'#10b981',borderWidth:2}}>
        <div className="card-title"><Building2 size={16}/> Société</div>
        <div className="form-group" style={{marginBottom:12}}>
          <label>Sélectionner la société</label>
          <select style={{background:'#0a1628',border:'1px solid #1e3a5f',borderRadius:8,padding:'8px 12px',color:'#f8fafc',fontSize:13}}>
            <option>Société Alpha — Mahamasina-ANTANANARIVO</option>
            <option>Société Beta — Ambilobe</option>
            <option>Société Gamma — Namakia</option>
          </select>
        </div>
        <div style={{background:'rgba(16,185,129,.1)',borderRadius:8,padding:12}}>
          <div style={{fontSize:12,color:'#64748b'}}>Société sélectionnée</div>
          <div style={{fontSize:16,fontWeight:700,color:'#10b981'}}>{societe}</div>
          <div style={{fontSize:12,color:'#94a3b8'}}>Mahamasina-ANTANANARIVO • Convention active • Pas de plafond</div>
        </div>
      </div>

      <div className="card" style={{borderColor:'#3b82f6',borderWidth:2}}>
        <div className="card-title"><User size={16}/> Travailleur</div>
        <div className="form-grid" style={{marginBottom:8}}>
          <div className="form-group"><label>Matricule</label><input placeholder="Ex: 000234" defaultValue="000234" style={{background:'#0a1628',border:'1px solid #1e3a5f',borderRadius:8,padding:'8px 12px',color:'#f8fafc',fontSize:13}}/></div>
          <div className="form-group"><label>Section</label><input placeholder="Ex: 034" defaultValue="220" style={{background:'#0a1628',border:'1px solid #1e3a5f',borderRadius:8,padding:'8px 12px',color:'#f8fafc',fontSize:13}}/></div>
        </div>
        <div style={{background:'rgba(59,130,246,.1)',borderRadius:8,padding:12}}>
          <div style={{fontSize:16,fontWeight:700,color:'#3b82f6'}}>{travailleur.nom}</div>
          <div style={{fontSize:12,color:'#94a3b8'}}>Matricule: {travailleur.matricule} • Section: {travailleur.section} ({travailleur.dpt})</div>
          <div style={{fontSize:12,color:'#94a3b8'}}>Type: {travailleur.type} • Embauché le {travailleur.embauche}</div>
        </div>
      </div>
    </div>

    <div className="grid2" style={{marginBottom:20}}>
      <div className="card">
        <div className="card-title">Ordonnance</div>
        <div className="form-grid">
          <div className="form-group"><label>N° ordonnance (hôpital)</label><input placeholder="Ex: 2026-0547" style={{fontWeight:600}}/></div>
          <div className="form-group"><label>Date ordonnance</label><input type="date" defaultValue="2026-07-01"/></div>
          <div className="form-group"><label>N° facture pharmacie</label><input placeholder="Auto — ex: F-2026-1042" defaultValue="F-2026-1042"/></div>
          <div className="form-group"><label>Bénéficiaire</label><select><option value="T">T — Travailleur</option><option value="F">F — Famille</option></select></div>
          <div className="form-group"><label>Pharmacien signataire</label><select><option>001 — Dr RABE</option><option>002 — Dr SOLO</option><option>003 — Dr NAINA</option><option>004 — Dr JEAN</option></select></div>
          <div className="form-group"><label>Nom du patient (si Famille)</label><input placeholder="Rempli si bénéficiaire = F"/></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title"><Search size={16}/> Ajouter médicament</div>
        <div className="search-bar" style={{maxWidth:'100%',marginBottom:12}}><Search size={16} color="#64748b"/><input placeholder="Rechercher un médicament..."/></div>
        <div style={{fontSize:12,color:'#475569',display:'flex',flexDirection:'column',gap:4}}>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 8px',background:'rgba(16,185,129,.05)',borderRadius:4,cursor:'pointer'}}>
            <span>PARACETAMOL 500MG</span><span style={{color:'#10b981'}}>2 500 Ar</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 8px',borderRadius:4,cursor:'pointer'}}>
            <span>PARACETAMOL 1000MG</span><span style={{color:'#10b981'}}>3 800 Ar</span>
          </div>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-title" style={{color:'#a855f7'}}>Médicaments délivrés — Compte {societe}</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Réf</th><th>Médicament</th><th>P.U.</th><th>Qté</th><th>Montant</th><th></th></tr></thead>
        <tbody>
          {panier.map((p,i) => <tr key={i}>
            <td style={{fontFamily:'monospace',fontSize:11,color:'#10b981'}}>{p.ref}</td>
            <td style={{fontWeight:500}}>{p.nom}</td>
            <td>{p.prix.toLocaleString()} Ar</td>
            <td>
              <div style={{display:'flex',alignItems:'center',gap:4}}>
                <button className="btn btn-outline" style={{padding:2}}><Minus size={12}/></button>
                <span style={{fontWeight:600,minWidth:24,textAlign:'center'}}>{p.qte}</span>
                <button className="btn btn-outline" style={{padding:2}}><Plus size={12}/></button>
              </div>
            </td>
            <td style={{fontWeight:600,color:'#10b981'}}>{(p.prix*p.qte).toLocaleString()} Ar</td>
            <td><button className="btn btn-outline" style={{padding:2,color:'#ef4444'}}><Trash2 size={12}/></button></td>
          </tr>)}
        </tbody>
      </table>
      </div>
      <div style={{borderTop:'1px solid #1e3a5f',marginTop:16,paddingTop:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontSize:12,color:'#64748b'}}>Total à imputer sur le compte</div>
          <div style={{fontSize:24,fontWeight:700,color:'#a855f7'}}>{total.toLocaleString()} Ar</div>
          <div style={{fontSize:11,color:'#64748b'}}>Société: {societe} • Travailleur: {travailleur.nom}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-outline"><FileText size={14}/> Aperçu</button>
          <button className="btn btn-primary" style={{background:'#a855f7'}}>Valider la délivrance</button>
        </div>
      </div>
    </div>
  </>
}
