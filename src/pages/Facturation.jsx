import { useState } from 'react'
import { FileText, Download, Building2, Calendar, Printer } from 'lucide-react'

export default function Facturation() {
  const [mois] = useState('Juin 2026')
  const [societe] = useState('Ouest Sucre')

  const categories = [
    { type:'ACHAT POUR L\'HOPITAL', famille:0, travailleur:2054500, nombre:8, montant:null },
    { type:'CADRES', famille:2210090, travailleur:1844700, nombre:80, montant:null },
    { type:'AGENTS DE MAÎTRISE', famille:3569970, travailleur:2426810, nombre:172, montant:null },
    { type:'EOM PERMANENTS', famille:22808140, travailleur:12761250, nombre:951, montant:null },
    { type:'EOM TEMPORAIRES', famille:80866200, travailleur:77360830, nombre:4449, montant:null },
  ]
  const totalFamille = categories.reduce((s,c) => s + c.famille, 0)
  const totalTravailleur = categories.reduce((s,c) => s + c.travailleur, 0)
  const totalNombre = categories.reduce((s,c) => s + c.nombre, 0)
  const totalHT = totalFamille + totalTravailleur
  const tva = Math.round(totalHT * 0.20)
  const totalTTC = totalHT + tva

  const historique = [
    { mois:'Juin 2026', societe:'Ouest Sucre', montant:'205 912 490', statut:'En attente', nb:5660 },
    { mois:'Mai 2026', societe:'Ouest Sucre', montant:'198 456 200', statut:'Payée', nb:5210 },
    { mois:'Mai 2026', societe:'SIRAMA', montant:'45 230 800', statut:'Payée', nb:1847 },
    { mois:'Avril 2026', societe:'Ouest Sucre', montant:'187 320 100', statut:'Payée', nb:4980 },
    { mois:'Avril 2026', societe:'SIRAMA', montant:'42 110 500', statut:'En retard', nb:1623 },
  ]

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <select className="btn btn-outline" style={{fontSize:13}}>
          <option>Ouest Sucre</option><option>SIRAMA</option><option>SUCOMA</option>
        </select>
        <select className="btn btn-outline" style={{fontSize:13}}>
          <option>Juin 2026</option><option>Mai 2026</option><option>Avril 2026</option>
        </select>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-outline"><Download size={14}/> Export PDF</button>
        <button className="btn btn-outline"><Printer size={14}/> Imprimer</button>
        <button className="btn btn-primary"><FileText size={14}/> Générer facture</button>
      </div>
    </div>

    <div className="card" style={{marginBottom:20}}>
      <div style={{textAlign:'center',marginBottom:20,paddingBottom:16,borderBottom:'2px solid #10b981'}}>
        <div style={{fontSize:11,color:'#64748b',letterSpacing:2}}>DÉPÔT DE MÉDICAMENTS</div>
        <div style={{fontSize:24,fontWeight:800,color:'#10b981'}}>SALAMA</div>
        <div style={{fontSize:12,color:'#94a3b8',marginTop:4}}>RABEMANANJARA SOLOFO Naina Jean Aimé</div>
        <div style={{fontSize:11,color:'#64748b'}}>Ankarana • N° STAT: 477 22 71 2017 0 00816 • NIF: 400 19 44848 • CMS: 034 73 108 93</div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:11,color:'#64748b',textTransform:'uppercase',letterSpacing:1}}>Facture N°</div>
          <div style={{fontSize:16,fontWeight:700,color:'#10b981'}}>FACT-06-2026-SALAMA</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:11,color:'#64748b'}}>Doit: Société</div>
          <div style={{fontSize:16,fontWeight:700}}>"{societe}"</div>
          <div style={{fontSize:12,color:'#94a3b8'}}>Ankarana-AMBILOBE</div>
        </div>
      </div>

      <div style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Ankarana, le 29/06/2026</div>

      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr>
          <th>Type</th>
          <th style={{textAlign:'right'}}>Famille</th>
          <th style={{textAlign:'right'}}>Travailleur</th>
          <th style={{textAlign:'right'}}>Nombre</th>
          <th style={{textAlign:'right'}}>Montant HT</th>
        </tr></thead>
        <tbody>
          {categories.map((c,i) => <tr key={i}>
            <td style={{fontWeight:500}}>{c.type}</td>
            <td style={{textAlign:'right',fontFamily:'monospace'}}>{c.famille ? c.famille.toLocaleString() : '0'}</td>
            <td style={{textAlign:'right',fontFamily:'monospace'}}>{c.travailleur.toLocaleString()}</td>
            <td style={{textAlign:'right'}}>{c.nombre.toLocaleString()}</td>
            <td style={{textAlign:'right',fontWeight:600}}>{(c.famille + c.travailleur).toLocaleString()}</td>
          </tr>)}
          <tr style={{fontWeight:700,borderTop:'2px solid #1e3a5f'}}>
            <td>TOTAL</td>
            <td style={{textAlign:'right',fontFamily:'monospace'}}>{totalFamille.toLocaleString()}</td>
            <td style={{textAlign:'right',fontFamily:'monospace'}}>{totalTravailleur.toLocaleString()}</td>
            <td style={{textAlign:'right'}}>{totalNombre.toLocaleString()}</td>
            <td style={{textAlign:'right',color:'#10b981'}}>{totalHT.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      </div>

      <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}>
        <div style={{width:300}}>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(30,58,95,.3)',fontSize:14}}>
            <span style={{color:'#94a3b8'}}>Total hors taxe</span><span style={{fontWeight:600}}>{totalHT.toLocaleString()} Ar</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(30,58,95,.3)',fontSize:14}}>
            <span style={{color:'#94a3b8'}}>T.V.A 20%</span><span>{tva.toLocaleString()} Ar</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0',fontSize:18,fontWeight:700}}>
            <span>Total net à payer</span><span style={{color:'#10b981'}}>{totalTTC.toLocaleString()} Ar</span>
          </div>
        </div>
      </div>

      <div style={{marginTop:20,padding:16,background:'rgba(16,185,129,.05)',borderRadius:8,fontSize:12,color:'#94a3b8',textAlign:'center'}}>
        Arrêté la présente facture à la somme de <strong style={{color:'#e2e8f0'}}>DEUX CENT CINQ MILLIONS NEUF CENT DOUZE MILLE QUATRE CENT QUATRE-VINGT DIX, Ariary</strong>
      </div>

      <div style={{textAlign:'center',marginTop:20,fontSize:12,color:'#64748b'}}>
        <div>Le dépositaire</div>
        <div style={{marginTop:24,fontWeight:600,color:'#e2e8f0'}}>RABEMANANJARA SOLOFO Naina Jean Aimé</div>
      </div>
    </div>

    <div className="card">
      <div className="card-title">Historique des facturations</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Mois</th><th>Société</th><th>Ordonnances</th><th>Montant TTC</th><th>Statut</th></tr></thead>
        <tbody>
          {historique.map((h,i) => <tr key={i}>
            <td style={{fontWeight:500}}>{h.mois}</td>
            <td>{h.societe}</td>
            <td>{h.nb.toLocaleString()}</td>
            <td style={{fontWeight:600}}>{h.montant} Ar</td>
            <td><span className={`badge ${h.statut==='Payée'?'b-g':h.statut==='En attente'?'b-y':'b-r'}`}>{h.statut}</span></td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>
  </>
}
