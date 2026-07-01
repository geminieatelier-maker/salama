import { useState } from 'react'
import { Building2, Users, Upload, Search, Plus, ChevronDown, ChevronRight } from 'lucide-react'

const societes = [
  { nom:'Ouest Sucre', lieu:'Ankarana-AMBILOBE', travailleurs:951, sections:['Direction','Cadres','Agents de maîtrise','EOM Permanents','EOM Temporaires'], convention:'Active', contact:'034 00 000 00' },
  { nom:'SIRAMA', lieu:'Ambilobe', travailleurs:623, sections:['Direction','Production','Maintenance','Transport'], convention:'Active', contact:'034 11 111 11' },
  { nom:'SUCOMA', lieu:'Namakia', travailleurs:412, sections:['Administration','Usine','Champs','Logistique'], convention:'Active', contact:'034 22 222 22' },
]

const travailleurs = [
  { matricule:'00234/003', nom:'RAKOTO Jean Baptiste', section:'EOM Permanents', type:'EOM Permanents', embauche:'15/03/2018' },
  { matricule:'00112/001', nom:'RABE Marie Josée', section:'Cadres', type:'Cadres', embauche:'02/01/2015' },
  { matricule:'00456/002', nom:'ANDRIA Paul Henri', section:'Agents de maîtrise', type:'Agents de maîtrise', embauche:'10/06/2020' },
  { matricule:'00789/004', nom:'RASOA Hery Lala', section:'EOM Permanents', type:'EOM Permanents', embauche:'22/09/2019' },
  { matricule:'01023/005', nom:'RINA Volatiana', section:'EOM Temporaires', type:'EOM Temporaires', embauche:'01/01/2026' },
  { matricule:'00567/001', nom:'FIDY Toavina', section:'Direction', type:'Cadres', embauche:'05/04/2012' },
  { matricule:'00890/003', nom:'NORO Hanitra', section:'EOM Permanents', type:'EOM Permanents', embauche:'18/07/2021' },
  { matricule:'01234/004', nom:'TIANA Mamitiana', section:'EOM Temporaires', type:'EOM Temporaires', embauche:'15/03/2026' },
]

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
        <div style={{fontSize:12,color:'#64748b'}}>Format import Excel: Matricule | Section | Nom | Type</div>
      </div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Matricule/Section</th><th>Nom & Prénom</th><th>Section</th><th>Type</th><th>Embauche</th></tr></thead>
        <tbody>
          {travailleurs.map(t => <tr key={t.matricule}>
            <td style={{fontFamily:'monospace',color:'#10b981',fontWeight:600}}>{t.matricule}</td>
            <td style={{fontWeight:500}}>{t.nom}</td>
            <td>{t.section}</td>
            <td><span className={`badge ${t.type==='Cadres'?'b-b':t.type==='Agents de maîtrise'?'b-p':t.type==='EOM Permanents'?'b-g':'b-y'}`}>{t.type}</span></td>
            <td style={{color:'#64748b'}}>{t.embauche}</td>
          </tr>)}
        </tbody>
      </table>
      </div>
    </div>}

    {tab === 'sections' && <div className="card">
      <div className="card-title">Sections / Départements — {soc.nom}</div>
      {soc.sections.map((s,i) => <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',borderBottom:'1px solid rgba(30,58,95,.3)',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}><ChevronRight size={14} color="#64748b"/><span>{s}</span></div>
        <span className="badge b-g">{Math.floor(soc.travailleurs / soc.sections.length)} travailleurs</span>
      </div>)}
    </div>}

    {tab === 'categories' && <div className="card">
      <div className="card-title">Catégories de personnel (pour facturation)</div>
      <div style={{fontSize:13,color:'#94a3b8'}}>
        <p style={{marginBottom:12}}>Les catégories suivantes sont utilisées dans la facturation mensuelle conformément au format de la société :</p>
        {['Achat pour l\'hôpital','Cadres','Agents de maîtrise','EOM Permanents','EOM Temporaires'].map((c,i) =>
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',borderBottom:'1px solid rgba(30,58,95,.3)',alignItems:'center'}}>
            <span style={{fontWeight:500,color:'#e2e8f0'}}>{c}</span>
            <span className="badge b-b">Type {i+1}</span>
          </div>
        )}
      </div>
    </div>}
  </>
}
