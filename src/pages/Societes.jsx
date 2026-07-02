import { useState } from 'react'
import { Building2, Users, Upload, Search, Plus, ChevronDown, ChevronRight } from 'lucide-react'

const societes = [
  { nom:'Société Alpha', lieu:'Mahamasina-ANTANANARIVO', travailleurs:951, sections:['Direction','Cadres','Agents de maîtrise','EOM Permanents','EOM Temporaires'], convention:'Active', contact:'034 00 000 00' },
  { nom:'Société Beta', lieu:'Ambilobe', travailleurs:623, sections:['Direction','Production','Maintenance','Transport'], convention:'Active', contact:'034 11 111 11' },
  { nom:'Société Gamma', lieu:'Namakia', travailleurs:412, sections:['Administration','Usine','Champs','Logistique'], convention:'Active', contact:'034 22 222 22' },
]

const travailleurs = [
  { matricule:'000234', section:'220', nom:'RAKOTO Jean Baptiste', type:'Permanent', embauche:'15/03/2018' },
  { matricule:'000112', section:'220', nom:'RABE Marie Josée', type:'Cadre', embauche:'02/01/2015' },
  { matricule:'000456', section:'400', nom:'ANDRIA Paul Henri', type:'Agent de maîtrise', embauche:'10/06/2020' },
  { matricule:'000789', section:'220', nom:'RASOA Hery Lala', type:'Permanent', embauche:'22/09/2019' },
  { matricule:'001023', section:'400', nom:'RINA Volatiana', type:'Temporaire', embauche:'01/01/2026' },
  { matricule:'000567', section:'220', nom:'FIDY Toavina', type:'Cadre', embauche:'05/04/2012' },
  { matricule:'000890', section:'400', nom:'NORO Hanitra', type:'Permanent', embauche:'18/07/2021' },
  { matricule:'001234', section:'400', nom:'TIANA Mamitiana', type:'Saisonnier', embauche:'15/03/2026' },
]

// La section identifie le département : 2xx = hospitalier, 4xx = usine
const deptOf = s => s.startsWith('2') ? 'Hospitalier' : s.startsWith('4') ? 'Usine' : 'Autre'
const typeBadge = t => t==='Cadre'?'b-b':t==='Agent de maîtrise'?'b-p':t==='Permanent'?'b-g':t==='Temporaire'?'b-y':'b-r'
const TYPES = ['Cadre','Permanent','Agent de maîtrise','Temporaire','Saisonnier']

export default function Societes() {
  const [selected, setSelected] = useState(0)
  const [tab, setTab] = useState('travailleurs')
  const soc = societes[selected]

  return <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
      <div style={{display:'flex',gap:8}}>
        {societes.map((s,i) => <button key={i} className={`btn ${i===selected?'btn-primary':'btn-outline'}`} onClick={()=>setSelected(i)}>
          <Building2 size={14}/> {s.nom}
        </button>)}
      </div>
      <button className="btn btn-primary"><Plus size={14}/> Nouvelle société</button>
    </div>

    <div className="card" style={{marginBottom:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <div style={{fontSize:22,fontWeight:700,color:'#10b981'}}>{soc.nom}</div>
          <div style={{fontSize:13,color:'#94a3b8',marginTop:4}}>{soc.lieu} • {soc.contact}</div>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <div style={{background:'rgba(16,185,129,.1)',borderRadius:8,padding:'8px 16px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#10b981'}}>{soc.travailleurs}</div>
              <div style={{fontSize:11,color:'#64748b'}}>Travailleurs</div>
            </div>
            <div style={{background:'rgba(59,130,246,.1)',borderRadius:8,padding:'8px 16px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#3b82f6'}}>{soc.sections.length}</div>
              <div style={{fontSize:11,color:'#64748b'}}>Sections</div>
            </div>
            <div style={{background:'rgba(168,85,247,.1)',borderRadius:8,padding:'8px 16px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#a855f7'}}>Active</div>
              <div style={{fontSize:11,color:'#64748b'}}>Convention</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-outline"><Upload size={14}/> Importer Excel</button>
          <button className="btn btn-primary"><Plus size={14}/> Ajouter travailleur</button>
        </div>
      </div>
    </div>

    <div className="tabs">
      <button className={`tab${tab==='travailleurs'?' active':''}`} onClick={()=>setTab('travailleurs')}>Travailleurs ({soc.travailleurs})</button>
      <button className={`tab${tab==='sections'?' active':''}`} onClick={()=>setTab('sections')}>Sections ({soc.sections.length})</button>
      <button className={`tab${tab==='categories'?' active':''}`} onClick={()=>setTab('categories')}>Catégories de personnel</button>
    </div>

    {tab === 'travailleurs' && <div className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div className="search-bar"><Search size={16} color="#64748b"/><input placeholder="Rechercher par matricule ou nom..."/></div>
        <div style={{fontSize:12,color:'#64748b'}}>Format import Excel: Matricule | Section | Nom & Prénom | Type | Date d'embauche</div>
      </div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Matricule</th><th>Section</th><th>Nom & Prénom</th><th>Type</th><th>Date d'embauche</th></tr></thead>
        <tbody>
          {travailleurs.map(t => <tr key={t.matricule}>
            <td style={{fontFamily:'monospace',color:'#10b981',fontWeight:600}}>{t.matricule}</td>
            <td style={{fontFamily:'monospace'}}>{t.section} <span style={{fontSize:11,color:'#64748b'}}>({deptOf(t.section)})</span></td>
            <td style={{fontWeight:500}}>{t.nom}</td>
            <td><span className={`badge ${typeBadge(t.type)}`}>{t.type}</span></td>
            <td style={{color:'#64748b'}}>{t.embauche}</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>}

    {tab === 'sections' && <div className="card">
      <div className="card-title">Sections / Départements — {soc.nom}</div>
      <div style={{fontSize:12,color:'#94a3b8',marginBottom:16,background:'rgba(59,130,246,.06)',borderRadius:8,padding:'10px 12px'}}>
        Le <strong style={{color:'#e2e8f0'}}>code section</strong> identifie le département : <span style={{fontFamily:'monospace',color:'#10b981'}}>2xx</span> → Département hospitalier · <span style={{fontFamily:'monospace',color:'#f59e0b'}}>4xx</span> → Département usine.
      </div>
      {[
        { code:'220', dept:'Hospitalier', nb:112 },
        { code:'221', dept:'Hospitalier', nb:64 },
        { code:'400', dept:'Usine', nb:203 },
        { code:'401', dept:'Usine', nb:98 },
      ].map((s,i) => <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',borderBottom:'1px solid rgba(30,58,95,.3)',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}><ChevronRight size={14} color="#64748b"/><span style={{fontFamily:'monospace',fontWeight:600}}>{s.code}</span><span style={{fontSize:12,color:'#94a3b8'}}>— Département {s.dept}</span></div>
        <span className={`badge ${s.dept==='Hospitalier'?'b-g':'b-y'}`}>{s.nb} travailleurs</span>
      </div>)}
    </div>}

    {tab === 'categories' && <div className="card">
      <div className="card-title">Types de personnel</div>
      <div style={{fontSize:13,color:'#94a3b8'}}>
        <p style={{marginBottom:12}}>Types disponibles pour chaque travailleur (utilisés dans la facturation mensuelle) :</p>
        {TYPES.map((c,i) =>
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',borderBottom:'1px solid rgba(30,58,95,.3)',alignItems:'center'}}>
            <span style={{fontWeight:500,color:'#e2e8f0'}}>{c}</span>
            <span className={`badge ${typeBadge(c)}`}>{c}</span>
          </div>
        )}
      </div>
    </div>}
  </>
}
