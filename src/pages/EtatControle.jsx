import { useState } from 'react'
import { ClipboardCheck, Download, Calendar, Building2, Printer, FileText } from 'lucide-react'

// Trié par date d'ordonnance (ordre chronologique)
const ordonnances = [
  { date:'28/06/2026', numOrd:'2026-4514', numFacture:'F-2026-1035', matricule:'001234', section:'400', benef:'T', nom:'TIANA Mamitiana', type:'Saisonnier', medicaments:'ASPIRINE 500MG x2, ACIDE FOLIQUE x1', montant:7500 },
  { date:'28/06/2026', numOrd:'2026-4515', numFacture:'F-2026-1036', matricule:'000890', section:'400', benef:'F', nom:'NORO Hanitra', type:'Permanent', medicaments:'PARACETAMOL 500MG x3, IBUPROFENE 400MG x1, VITAMINE C x2', montant:14000 },
  { date:'29/06/2026', numOrd:'2026-4516', numFacture:'F-2026-1037', matricule:'000567', section:'220', benef:'T', nom:'FIDY Toavina', type:'Cadre', medicaments:'ATENOLOL 50MG x1', montant:5800 },
  { date:'29/06/2026', numOrd:'2026-4517', numFacture:'F-2026-1038', matricule:'001023', section:'400', benef:'T', nom:'RINA Volatiana', type:'Temporaire', medicaments:'AMOXICILLINE 500MG x2, OMEPRAZOLE 20MG x1', montant:16000 },
  { date:'30/06/2026', numOrd:'2026-4518', numFacture:'F-2026-1039', matricule:'000789', section:'220', benef:'T', nom:'RASOA Hery Lala', type:'Permanent', medicaments:'PARACETAMOL 500MG x5, ACIDE FOLIQUE x3', montant:17000 },
  { date:'30/06/2026', numOrd:'2026-4519', numFacture:'F-2026-1040', matricule:'000456', section:'400', benef:'F', nom:'ANDRIA Paul Henri', type:'Agent de maîtrise', medicaments:'ASPIRINE 500MG x3, VITAMINE C x2', montant:12000 },
  { date:'01/07/2026', numOrd:'2026-4520', numFacture:'F-2026-1041', matricule:'000112', section:'220', benef:'T', nom:'RABE Marie Josée', type:'Cadre', medicaments:'OMEPRAZOLE 20MG x1, IBUPROFENE 400MG x2', montant:14000 },
  { date:'01/07/2026', numOrd:'2026-4521', numFacture:'F-2026-1042', matricule:'000234', section:'220', benef:'T', nom:'RAKOTO Jean Baptiste', type:'Permanent', medicaments:'PARACETAMOL 500MG x2, AMOXICILLINE 500MG x1', montant:9500 },
]

const deptOf = s => s.startsWith('2') ? 'Hospitalier' : s.startsWith('4') ? 'Usine' : 'Autre'
const typeBadge = t => t==='Cadre'?'b-b':t==='Agent de maîtrise'?'b-p':t==='Permanent'?'b-g':t==='Temporaire'?'b-y':'b-r'

export default function EtatControle() {
  const [tab, setTab] = useState('controle')

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8}}>
        <select className="btn btn-outline" style={{fontSize:13}}>
          <option>Société Alpha</option><option>Société Beta</option><option>Société Gamma</option>
        </select>
        <select className="btn btn-outline" style={{fontSize:13}}>
          <option>Juin 2026</option><option>Mai 2026</option><option>Avril 2026</option>
        </select>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-outline"><Download size={14}/> Export PDF</button>
        <button className="btn btn-outline"><Printer size={14}/> Imprimer</button>
      </div>
    </div>

    <div className="stats" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
      <div className="stat"><div className="label">Ordonnances</div><div className="value" style={{color:'#10b981'}}>6 085</div><div className="sub" style={{color:'#94a3b8'}}>Ce mois • 190 pages</div></div>
      <div className="stat"><div className="label">Travailleurs servis</div><div className="value" style={{color:'#3b82f6'}}>1 842</div><div className="sub" style={{color:'#94a3b8'}}>Sur 5 660</div></div>
      <div className="stat"><div className="label">Médicaments délivrés</div><div className="value" style={{color:'#a855f7'}}>12 480</div><div className="sub" style={{color:'#94a3b8'}}>287 références</div></div>
      <div className="stat"><div className="label">Montant total</div><div className="value" style={{color:'#f59e0b'}}>96.4M</div><div className="sub" style={{color:'#94a3b8'}}>Ar HT</div></div>
    </div>

    <div className="tabs">
      <button className={`tab${tab==='controle'?' active':''}`} onClick={()=>setTab('controle')}>État de contrôle</button>
      <button className={`tab${tab==='detail'?' active':''}`} onClick={()=>setTab('detail')}>Détail par ordonnance</button>
      <button className={`tab${tab==='stock'?' active':''}`} onClick={()=>setTab('stock')}>État de stock société</button>
    </div>

    {tab === 'controle' && <div className="card">
      <div className="card-title"><ClipboardCheck size={16}/> État de contrôle — Société Alpha — Juin 2026</div>
      <div style={{fontSize:12,color:'#64748b',marginBottom:8}}>Enregistrement de toutes les ordonnances et factures détaillées des médicaments consommés — trié par date d'ordonnance</div>
      <div style={{fontSize:11,color:'#94a3b8',marginBottom:16,background:'rgba(245,158,11,.06)',borderRadius:8,padding:'8px 12px'}}>
        📄 Format papier listing 3 plis — gros volume supporté (exemple : ~6 085 ordonnances / 190 pages). Le N° d'ordonnance (hôpital) est la référence principale.
      </div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Date ord.</th><th>N° ordonnance (hôpital)</th><th>N° facture pharm.</th><th>Bénéf.</th><th>Matricule</th><th>Section</th><th>Nom & Prénom</th><th>Type</th><th>Montant</th></tr></thead>
        <tbody>
          {ordonnances.map((o,i) => <tr key={i}>
            <td>{o.date}</td>
            <td style={{fontFamily:'monospace',color:'#10b981',fontWeight:700}}>{o.numOrd}</td>
            <td style={{fontFamily:'monospace',fontSize:11,color:'#94a3b8'}}>{o.numFacture}</td>
            <td style={{textAlign:'center'}}><span className={`badge ${o.benef==='T'?'b-b':'b-p'}`}>{o.benef}</span></td>
            <td style={{fontFamily:'monospace',fontSize:11}}>{o.matricule}</td>
            <td style={{fontFamily:'monospace',fontSize:11}}>{o.section} <span style={{color:'#64748b'}}>({deptOf(o.section)})</span></td>
            <td style={{fontWeight:500}}>{o.nom}</td>
            <td><span className={`badge ${typeBadge(o.type)}`}>{o.type}</span></td>
            <td style={{fontWeight:600}}>{o.montant.toLocaleString()} Ar</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>}

    {tab === 'detail' && <div className="card">
      <div className="card-title"><FileText size={16}/> Détail des médicaments par ordonnance</div>
      {ordonnances.slice(0,4).map((o,i) => <div key={i} style={{marginBottom:16,padding:16,background:'rgba(16,185,129,.03)',borderRadius:8,border:'1px solid rgba(30,58,95,.3)'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
          <div>
            <span style={{fontFamily:'monospace',color:'#10b981',fontWeight:600}}>{o.numOrd}</span>
            <span style={{color:'#64748b',fontSize:12,marginLeft:12}}>{o.date}</span>
            <span style={{color:'#64748b',fontSize:12,marginLeft:12}}>Facture: {o.numFacture}</span>
          </div>
          <span style={{fontWeight:600}}>{o.montant.toLocaleString()} Ar</span>
        </div>
        <div style={{fontSize:13,color:'#94a3b8'}}>
          <span style={{fontWeight:500,color:'#e2e8f0'}}>{o.nom}</span>
          <span style={{marginLeft:8,fontSize:11}}>({o.matricule})</span>
        </div>
        <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{o.medicaments}</div>
      </div>)}
    </div>}

    {tab === 'stock' && <div className="card">
      <div className="card-title">État de stock — Médicaments consommés par Société Alpha — Juin 2026</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Référence</th><th>Médicament</th><th>Qté consommée</th><th>Prix unitaire</th><th>Montant total</th></tr></thead>
        <tbody>
          {[
            { ref:'PAR00011', nom:'PARACETAMOL 500MG', qte:342, prix:2500 },
            { ref:'AMO00007', nom:'AMOXICILLINE 500MG', qte:287, prix:4500 },
            { ref:'IBU00012', nom:'IBUPROFENE 400MG', qte:198, prix:3500 },
            { ref:'OME00013', nom:'OMEPRAZOLE 20MG', qte:156, prix:7000 },
            { ref:'ASP00009', nom:'ASPIRINE 500MG', qte:134, prix:3000 },
            { ref:'ACI00545', nom:'ACIDE FOLIQUE', qte:98, prix:1500 },
            { ref:'VIT00014', nom:'VITAMINE C 1000MG', qte:89, prix:1500 },
            { ref:'ATE00010', nom:'ATENOLOL 50MG', qte:67, prix:5800 },
          ].map(p => <tr key={p.ref}>
            <td style={{fontFamily:'monospace',color:'#10b981'}}>{p.ref}</td>
            <td style={{fontWeight:500}}>{p.nom}</td>
            <td style={{fontWeight:600,color:'#a855f7'}}>{p.qte}</td>
            <td>{p.prix.toLocaleString()} Ar</td>
            <td style={{fontWeight:600}}>{(p.qte * p.prix).toLocaleString()} Ar</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>}
  </>
}
