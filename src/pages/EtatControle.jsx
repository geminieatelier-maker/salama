import { useState } from 'react'
import { ClipboardCheck, Download, Calendar, Building2, Printer, FileText } from 'lucide-react'

const ordonnances = [
  { date:'01/07/2026', numOrd:'ORD-4521', numPharm:'001', matricule:'00234/003', nom:'RAKOTO Jean Baptiste', section:'EOM Permanents', type:'EOM Permanents', medicaments:'PARACETAMOL 500MG x2, AMOXICILLINE 500MG x1', montant:9500 },
  { date:'01/07/2026', numOrd:'ORD-4520', numPharm:'002', matricule:'00112/001', nom:'RABE Marie Josée', section:'Cadres', type:'Cadres', medicaments:'OMEPRAZOLE 20MG x1, IBUPROFENE 400MG x2', montant:14000 },
  { date:'30/06/2026', numOrd:'ORD-4519', numPharm:'001', matricule:'00456/002', nom:'ANDRIA Paul Henri', section:'Agents de maîtrise', type:'Agents de maîtrise', medicaments:'ASPIRINE 500MG x3, VITAMINE C x2', montant:12000 },
  { date:'30/06/2026', numOrd:'ORD-4518', numPharm:'003', matricule:'00789/004', nom:'RASOA Hery Lala', section:'EOM Permanents', type:'EOM Permanents', medicaments:'PARACETAMOL 500MG x5, ACIDE FOLIQUE x3', montant:17000 },
  { date:'29/06/2026', numOrd:'ORD-4517', numPharm:'002', matricule:'01023/005', nom:'RINA Volatiana', section:'EOM Temporaires', type:'EOM Temporaires', medicaments:'AMOXICILLINE 500MG x2, OMEPRAZOLE 20MG x1', montant:16000 },
  { date:'29/06/2026', numOrd:'ORD-4516', numPharm:'001', matricule:'00567/001', nom:'FIDY Toavina', section:'Direction', type:'Cadres', medicaments:'ATENOLOL 50MG x1', montant:5800 },
  { date:'28/06/2026', numOrd:'ORD-4515', numPharm:'004', matricule:'00890/003', nom:'NORO Hanitra', section:'EOM Permanents', type:'EOM Permanents', medicaments:'PARACETAMOL 500MG x3, IBUPROFENE 400MG x1, VITAMINE C x2', montant:14000 },
  { date:'28/06/2026', numOrd:'ORD-4514', numPharm:'002', matricule:'01234/004', nom:'TIANA Mamitiana', section:'EOM Temporaires', type:'EOM Temporaires', medicaments:'ASPIRINE 500MG x2, ACIDE FOLIQUE x1', montant:7500 },
]

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
      <div className="stat"><div className="label">Ordonnances</div><div className="value" style={{color:'#10b981'}}>4 237</div><div className="sub" style={{color:'#94a3b8'}}>Ce mois</div></div>
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
      <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>Enregistrement de toutes les ordonnances et factures détaillées des médicaments consommés</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Date</th><th>N° Ord</th><th>N° Pharm</th><th>Matricule</th><th>Nom & Prénom</th><th>Section</th><th>Type</th><th>Montant</th></tr></thead>
        <tbody>
          {ordonnances.map((o,i) => <tr key={i}>
            <td>{o.date}</td>
            <td style={{fontFamily:'monospace',color:'#10b981'}}>{o.numOrd}</td>
            <td style={{textAlign:'center'}}>{o.numPharm}</td>
            <td style={{fontFamily:'monospace',fontSize:11}}>{o.matricule}</td>
            <td style={{fontWeight:500}}>{o.nom}</td>
            <td style={{fontSize:12}}>{o.section}</td>
            <td><span className={`badge ${o.type==='Cadres'?'b-b':o.type==='Agents de maîtrise'?'b-p':o.type==='EOM Permanents'?'b-g':'b-y'}`}>{o.type}</span></td>
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
            <span style={{color:'#64748b',fontSize:12,marginLeft:12}}>Pharm: {o.numPharm}</span>
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
