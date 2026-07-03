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

// Reproduction du listing papier "Etat de controle des frais pharmaceutiques"
const controleRows = [
  { sec:'381', matr:'43770', nom:'ISMAEL HACHIM BACAR', pharm:'0001/01', hopital:'0900000', du:'01/06/2026', famille:0, travailleur:37000 },
  { sec:'381', matr:'46256', nom:'EMETE', pharm:'0002/01', hopital:'0900000', du:'30/06/2026', famille:33600, travailleur:0 },
  { sec:'381', matr:'46591', nom:'EPIERA', pharm:'0003/01', hopital:'0900000', du:'30/06/2026', famille:0, travailleur:24600 },
  { sec:'381', matr:'47372', nom:'CHRISTIAN', pharm:'0004/01', hopital:'0900000', du:'30/06/2026', famille:124800, travailleur:0 },
  { sec:'381', matr:'46651', nom:'KAMALY AMAD', pharm:'0005/01', hopital:'0900000', du:'30/06/2026', famille:0, travailleur:133500 },
  { sec:'381', matr:'44898', nom:'FADZIA ALY', pharm:'0006/01', hopital:'0900000', du:'30/06/2026', famille:72500, travailleur:0 },
  { sec:'381', matr:'46901', nom:'BENJARA CHRISTOPHE', pharm:'0007/01', hopital:'0900000', du:'30/06/2026', famille:0, travailleur:61900 },
  { sec:'381', matr:'44551', nom:'TOMBO JEAN', pharm:'0008/01', hopital:'0900000', du:'30/06/2026', famille:44000, travailleur:0 },
  { sec:'381', matr:'44223', nom:'JEAN PIERRE', pharm:'0009/01', hopital:'0900000', du:'30/06/2026', famille:0, travailleur:80000 },
  { sec:'361', matr:'44420', nom:'RABIALAHY HONORE', pharm:'0010/01', hopital:'0900000', du:'30/06/2026', famille:19000, travailleur:0 },
  { sec:'341', matr:'43005', nom:'RANDRIA JEAN PIERRE', pharm:'0011/01', hopital:'0900000', du:'01/06/2026', famille:0, travailleur:14000 },
  { sec:'341', matr:'45120', nom:'BEHAJA NHAMED', pharm:'0012/01', hopital:'0900000', du:'01/06/2026', famille:9000, travailleur:0 },
  { sec:'302', matr:'46732', nom:'NORINE', pharm:'0013/01', hopital:'0900000', du:'01/06/2026', famille:0, travailleur:12500 },
  { sec:'371', matr:'46255', nom:'MAHERINIRINA FALICENCE', pharm:'0014/01', hopital:'0900000', du:'01/06/2026', famille:8200, travailleur:0 },
]
const MOIS_FAMILLE = 116296500
const MOIS_TRAV = 103288630
const EN_LETTRES = 'DEUX CENT DIX-NEUF MILLIONS CINQ CENT QUATRE-VINGT-CINQ MILLE CENT TRENTE'
const pc = { border:'1px solid #93c5fd', padding:'3px 6px', textAlign:'center', whiteSpace:'nowrap', fontSize:11 }
const pl = { ...pc, textAlign:'left' }
const pr = { ...pc, textAlign:'right' }

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
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div className="card-title" style={{margin:0}}><ClipboardCheck size={16}/> État de contrôle — aperçu format papier listing</div>
        <button className="btn btn-outline"><Printer size={14}/> Imprimer le listing</button>
      </div>
      <div style={{fontSize:11,color:'#94a3b8',marginBottom:12}}>Reproduction fidèle du listing papier 3 plis. Trié par date d'ordonnance • gros volume (ex : 6 085 ordonnances / 190 pages).</div>

      {/* Reproduction papier : fond blanc, encre bleue, picots listing */}
      <div style={{display:'flex',gap:0,alignItems:'stretch'}}>
        <div style={{width:16,background:'repeating-linear-gradient(#fff,#fff 14px,#1e3a8a 14px,#1e3a8a 15px,#fff 15px,#fff 22px)',border:'1px solid #cbd5e1',borderRight:'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around',padding:'8px 0'}}>
          {Array.from({length:12}).map((_,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#e2e8f0',border:'1px solid #94a3b8'}}/>)}
        </div>
        <div style={{flex:1,background:'#fff',color:'#1e3a8a',padding:'16px 14px',fontFamily:'"Courier New",monospace',overflowX:'auto',border:'1px solid #cbd5e1'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:6}}>
            <span>DEPOT DE MEDICAMENTS DEMO</span>
            <span>Cx 000000&nbsp;&nbsp;Page 1</span>
          </div>
          <div style={{textAlign:'center',fontWeight:700,letterSpacing:1,fontSize:13}}>ETAT DE CONTROLE DES FRAIS PHARMACEUTIQUES</div>
          <div style={{textAlign:'center',marginBottom:10,fontSize:12}}>JUIN 2026</div>
          <table style={{width:'100%',borderCollapse:'collapse',color:'#1e3a8a'}}>
            <thead>
              <tr>
                <th rowSpan={2} style={pc}>SEC</th>
                <th rowSpan={2} style={pc}>MATR</th>
                <th rowSpan={2} style={pl}>NOM ET PRENOMS</th>
                <th colSpan={2} style={pc}>ORDONNANCE</th>
                <th rowSpan={2} style={pc}>DU</th>
                <th colSpan={2} style={pc}>PATENT</th>
                <th rowSpan={2} style={pc}>TOTAL</th>
              </tr>
              <tr>
                <th style={pc}>N° PHARMACIE</th>
                <th style={pc}>N° HOPITAL</th>
                <th style={pc}>FAMILLE</th>
                <th style={pc}>TRAVAILLEUR</th>
              </tr>
            </thead>
            <tbody>
              {controleRows.map((r,i) => <tr key={i}>
                <td style={pc}>{r.sec}</td>
                <td style={pc}>{r.matr}</td>
                <td style={pl}>{r.nom}</td>
                <td style={pc}>{r.pharm}</td>
                <td style={pc}>{r.hopital}</td>
                <td style={pc}>{r.du}</td>
                <td style={pr}>{r.famille ? r.famille.toLocaleString() : ''}</td>
                <td style={pr}>{r.travailleur ? r.travailleur.toLocaleString() : ''}</td>
                <td style={pr}>{((r.famille||0)+(r.travailleur||0)).toLocaleString()}</td>
              </tr>)}
            </tbody>
          </table>
          <table style={{width:'100%',borderCollapse:'collapse',color:'#1e3a8a',fontWeight:700,marginTop:2}}>
            <tbody><tr>
              <td colSpan={6} style={{...pl,borderTop:'2px solid #1e3a8a'}}>TOTAL DU MOIS DE JUIN 2026&nbsp;&nbsp;( 6085 Ordonnances )</td>
              <td style={{...pr,borderTop:'2px solid #1e3a8a'}}>{MOIS_FAMILLE.toLocaleString()}</td>
              <td style={{...pr,borderTop:'2px solid #1e3a8a'}}>{MOIS_TRAV.toLocaleString()}</td>
              <td style={{...pr,borderTop:'2px solid #1e3a8a'}}>{(MOIS_FAMILLE+MOIS_TRAV).toLocaleString()}</td>
            </tr></tbody>
          </table>
          <div style={{marginTop:8,fontSize:11}}>EN LETTRE : {EN_LETTRES} Ariary</div>
        </div>
        <div style={{width:16,background:'repeating-linear-gradient(#fff,#fff 14px,#1e3a8a 14px,#1e3a8a 15px,#fff 15px,#fff 22px)',border:'1px solid #cbd5e1',borderLeft:'none',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around',padding:'8px 0'}}>
          {Array.from({length:12}).map((_,i)=><div key={i} style={{width:6,height:6,borderRadius:'50%',background:'#e2e8f0',border:'1px solid #94a3b8'}}/>)}
        </div>
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
