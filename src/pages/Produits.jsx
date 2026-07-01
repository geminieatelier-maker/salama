import { useState } from 'react'
import { Plus, Search, Download, Upload, Filter } from 'lucide-react'

const data = [
  { ref:'ACA00543', nom:'ACARIL BIAL Solution', unite:'1 Boite', cat:'Solution', prixAchat:17100, prixVente:20500, stock:20 },
  { ref:'ACI00545', nom:'ACIDE FOLIQUE', unite:'1 Plaquette', cat:'Vitamine', prixAchat:1350, prixVente:1500, stock:50 },
  { ref:'ACU00001', nom:'ACUPAN INJ', unite:'1 Ampoule', cat:'Injectable', prixAchat:4800, prixVente:6500, stock:81 },
  { ref:'ACY00002', nom:'ACYCLOVIR CP 200MG', unite:'1 Boite', cat:'Antiviral', prixAchat:20800, prixVente:32000, stock:4 },
  { ref:'ACY00003', nom:'ACYCLOVIR CP 800MG', unite:'1 Boite', cat:'Antiviral', prixAchat:35710, prixVente:48500, stock:11 },
  { ref:'ACY00004', nom:'ACYCLOVIR DENK 200MG', unite:'1 Boite', cat:'Antiviral', prixAchat:47820, prixVente:62000, stock:0 },
  { ref:'ADI00005', nom:'ADIPINE 10', unite:'1 Boite', cat:'Cardiovasculaire', prixAchat:8500, prixVente:10000, stock:27 },
  { ref:'ALB00006', nom:'ALBENDAZOLE 400MG', unite:'1 Plaquette', cat:'Antiparasitaire', prixAchat:800, prixVente:1200, stock:120 },
  { ref:'AMO00007', nom:'AMOXICILLINE 500MG', unite:'1 Boite', cat:'Antibiotique', prixAchat:3200, prixVente:4500, stock:8 },
  { ref:'AMP00008', nom:'AMPICILLINE INJ 1G', unite:'1 Flacon', cat:'Antibiotique', prixAchat:5600, prixVente:7500, stock:45 },
  { ref:'ASP00009', nom:'ASPIRINE 500MG', unite:'1 Boite', cat:'Antalgique', prixAchat:2100, prixVente:3000, stock:65 },
  { ref:'ATE00010', nom:'ATENOLOL 50MG', unite:'1 Boite', cat:'Cardiovasculaire', prixAchat:4200, prixVente:5800, stock:32 },
]

export default function Produits() {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const filtered = data.filter(p => p.nom.toLowerCase().includes(search.toLowerCase()) || p.ref.toLowerCase().includes(search.toLowerCase()))

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8}}>
        <div className="search-bar"><Search size={16} color="#64748b"/><input placeholder="Rechercher par nom ou référence..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <button className="btn btn-outline"><Filter size={14}/> Catégorie</button>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-outline"><Upload size={14}/> Import Excel</button>
        <button className="btn btn-outline"><Download size={14}/> Export</button>
        <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)}><Plus size={14}/> Nouveau produit</button>
      </div>
    </div>

    {showForm && <div className="card" style={{marginBottom:20}}>
      <div className="card-title">Nouveau médicament</div>
      <div className="form-grid">
        <div className="form-group"><label>Référence</label><input placeholder="Ex: PAR00011"/></div>
        <div className="form-group"><label>Désignation</label><input placeholder="Ex: PARACETAMOL 1000MG"/></div>
        <div className="form-group"><label>Catégorie</label><select><option>Antalgique</option><option>Antibiotique</option><option>Antiviral</option><option>Cardiovasculaire</option><option>Injectable</option><option>Vitamine</option><option>Solution</option><option>Antiparasitaire</option></select></div>
        <div className="form-group"><label>Unité</label><select><option>1 Boite</option><option>1 Plaquette</option><option>1 Flacon</option><option>1 Ampoule</option><option>1 Tube</option></select></div>
        <div className="form-group"><label>Prix d'achat (Ar)</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Prix de vente (Ar)</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Stock initial</label><input type="number" placeholder="0"/></div>
        <div className="form-group"><label>Seuil d'alerte</label><input type="number" placeholder="10"/></div>
        <div className="form-group"><label>Date d'expiration</label><input type="date"/></div>
        <div className="form-group"><label>Emplacement</label><input placeholder="Ex: Étagère A3"/></div>
        <div className="form-full" style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="btn btn-outline" onClick={()=>setShowForm(false)}>Annuler</button>
          <button className="btn btn-primary">Enregistrer</button>
        </div>
      </div>
    </div>}

    <div className="card">
      <div className="card-title">Catalogue — {filtered.length} médicaments</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Référence</th><th>Désignation</th><th>Unité</th><th>Catégorie</th><th>Prix achat</th><th>Prix vente</th><th>Stock</th><th>Statut</th></tr></thead>
        <tbody>
          {filtered.map(p => <tr key={p.ref}>
            <td style={{fontFamily:'monospace',color:'#10b981'}}>{p.ref}</td>
            <td style={{fontWeight:500}}>{p.nom}</td>
            <td>{p.unite}</td>
            <td><span className="badge b-b">{p.cat}</span></td>
            <td>{p.prixAchat.toLocaleString()} Ar</td>
            <td style={{fontWeight:600}}>{p.prixVente.toLocaleString()} Ar</td>
            <td style={{fontWeight:600,color:p.stock===0?'#ef4444':p.stock<15?'#f59e0b':'#10b981'}}>{p.stock}</td>
            <td>{p.stock===0?<span className="badge b-r">Rupture</span>:p.stock<15?<span className="badge b-y">Stock bas</span>:<span className="badge b-g">OK</span>}</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>
  </>
}
