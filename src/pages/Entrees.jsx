import { useState } from 'react'
import { Plus, Search, Calendar } from 'lucide-react'

const data = [
  { date:'01/07/2026', ref:'ACA00543', nom:'ACARIL BIAL Solution', unite:'1 Boite', qte:20, prixAchat:17100, prixVente:20500 },
  { date:'01/07/2026', ref:'ACU00001', nom:'ACUPAN INJ', unite:'1 Ampoule', qte:100, prixAchat:4800, prixVente:6500 },
  { date:'28/06/2026', ref:'AMO00007', nom:'AMOXICILLINE 500MG', unite:'1 Boite', qte:50, prixAchat:3200, prixVente:4500 },
  { date:'28/06/2026', ref:'PAR00011', nom:'PARACETAMOL 500MG', unite:'1 Boite', qte:200, prixAchat:1800, prixVente:2500 },
  { date:'25/06/2026', ref:'IBU00012', nom:'IBUPROFENE 400MG', unite:'1 Boite', qte:80, prixAchat:2400, prixVente:3500 },
  { date:'25/06/2026', ref:'OME00013', nom:'OMEPRAZOLE 20MG', unite:'1 Boite', qte:60, prixAchat:5200, prixVente:7000 },
  { date:'20/06/2026', ref:'ACI00545', nom:'ACIDE FOLIQUE', unite:'1 Plaquette', qte:100, prixAchat:1350, prixVente:1500 },
]

export default function Entrees() {
  const [showForm, setShowForm] = useState(false)

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8}}>
        <div className="search-bar"><Search size={16} color="#64748b"/><input placeholder="Rechercher..."/></div>
        <button className="btn btn-outline"><Calendar size={14}/> Période</button>
      </div>
      <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={14}/> Nouvelle entrée</button>
    </div>

    {showForm && <div className="card" style={{marginBottom:20}}>
      <div className="card-title">Enregistrer une entrée de stock</div>
      <div className="form-grid">
        <div className="form-group"><label>Date</label><input type="date" defaultValue="2026-07-01"/></div>
        <div className="form-group"><label>Référence produit</label><input placeholder="Saisir ou scanner la référence"/></div>
        <div className="form-group"><label>Désignation</label><input placeholder="Rempli automatiquement"/></div>
        <div className="form-group"><label>Quantité entrante</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Prix d'achat (Ar)</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Prix de vente (Ar)</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Date d'expiration</label><input type="date"/></div>
        <div className="form-group"><label>Fournisseur</label><input placeholder="Nom du fournisseur"/></div>
        <div className="form-full" style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="btn btn-outline" onClick={()=>setShowForm(false)}>Annuler</button>
          <button className="btn btn-primary">Enregistrer l'entrée</button>
        </div>
      </div>
    </div>}

    <div className="card">
      <div className="card-title">Historique des entrées</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Date</th><th>Référence</th><th>Désignation</th><th>Unité</th><th>Qté</th><th>Prix achat</th><th>Prix vente</th><th>Valeur totale</th></tr></thead>
        <tbody>
          {data.map((e,i) => <tr key={i}>
            <td>{e.date}</td>
            <td style={{fontFamily:'monospace',color:'#10b981'}}>{e.ref}</td>
            <td style={{fontWeight:500}}>{e.nom}</td>
            <td>{e.unite}</td>
            <td style={{fontWeight:600,color:'#10b981'}}>{e.qte}</td>
            <td>{e.prixAchat.toLocaleString()} Ar</td>
            <td>{e.prixVente.toLocaleString()} Ar</td>
            <td style={{fontWeight:600}}>{(e.qte*e.prixAchat).toLocaleString()} Ar</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>
  </>
}
