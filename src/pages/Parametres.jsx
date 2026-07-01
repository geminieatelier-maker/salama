import { useState } from 'react'
import { Settings, User, Building2, Shield, Save, Database, Upload, Download, Users, Printer } from 'lucide-react'

export default function Parametres() {
  const [tab, setTab] = useState('entreprise')

  return <>
    <div className="tabs">
      <button className={`tab${tab==='entreprise'?' active':''}`} onClick={()=>setTab('entreprise')}>Dépôt</button>
      <button className={`tab${tab==='signataires'?' active':''}`} onClick={()=>setTab('signataires')}>Signataires</button>
      <button className={`tab${tab==='utilisateurs'?' active':''}`} onClick={()=>setTab('utilisateurs')}>Utilisateurs</button>
      <button className={`tab${tab==='sauvegarde'?' active':''}`} onClick={()=>setTab('sauvegarde')}>Sauvegarde</button>
      <button className={`tab${tab==='impression'?' active':''}`} onClick={()=>setTab('impression')}>Impression</button>
    </div>

    {tab === 'entreprise' && <div className="card">
      <div className="card-title"><Building2 size={16}/> Informations du dépôt</div>
      <div className="form-grid">
        <div className="form-group"><label>Nom du dépôt</label><input defaultValue="DEPOT DE MEDICAMENTS DEMO"/></div>
        <div className="form-group"><label>Dépositaire</label><input defaultValue="RANDRIA Michel André"/></div>
        <div className="form-group"><label>Adresse</label><input defaultValue="Mahamasina"/></div>
        <div className="form-group"><label>Téléphone</label><input defaultValue="034 00 000 00"/></div>
        <div className="form-group"><label>N° STAT</label><input defaultValue="512 33 82 2024 0 01234"/></div>
        <div className="form-group"><label>NIF</label><input defaultValue="500 22 55667"/></div>
        <div className="form-group"><label>CMS</label><input defaultValue="034 00 000 00"/></div>
        <div className="form-group"><label>Email</label><input placeholder="email@exemple.com"/></div>
        <div className="form-group form-full"><label>Logo du dépôt</label><input type="file"/></div>
        <div className="form-full" style={{display:'flex',justifyContent:'flex-end'}}><button className="btn btn-primary"><Save size={14}/> Enregistrer</button></div>
      </div>
    </div>}

    {tab === 'signataires' && <div className="card">
      <div className="card-title"><User size={16}/> Pharmaciens signataires</div>
      <div style={{fontSize:12,color:'#64748b',marginBottom:16}}>Les pharmaciens qui signent les ordonnances et les factures</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Code</th><th>Nom du signataire</th><th>Actions</th></tr></thead>
        <tbody>
          {[
            { code:'001', nom:'Dr RABE Fidy' },
            { code:'002', nom:'Dr SOLO Andria' },
            { code:'003', nom:'Dr NAINA Hery' },
            { code:'004', nom:'Dr JEAN Marc' },
          ].map(s => <tr key={s.code}>
            <td style={{fontFamily:'monospace',color:'#10b981',fontWeight:600}}>{s.code}</td>
            <td style={{fontWeight:500}}>{s.nom}</td>
            <td><button className="btn btn-outline" style={{padding:'4px 8px',fontSize:11}}>Modifier</button></td>
          </tr>)}
        </tbody>
      </table>
      </div>
      <div style={{marginTop:16}}>
        <div className="form-grid">
          <div className="form-group"><label>Code</label><input placeholder="Ex: 005"/></div>
          <div className="form-group"><label>Nom du signataire</label><input placeholder="Ex: Dr RAKOTO"/></div>
          <div><button className="btn btn-primary" style={{marginTop:20}}><User size={14}/> Ajouter</button></div>
        </div>
      </div>
    </div>}

    {tab === 'utilisateurs' && <div className="card">
      <div className="card-title"><Users size={16}/> Utilisateurs du système</div>
      <div className="tbl-wrap">
      <table className="tbl">
        <thead><tr><th>Nom</th><th>Rôle</th><th>Droits</th><th>Statut</th></tr></thead>
        <tbody>
          <tr><td style={{fontWeight:500}}>Admin SALAMA</td><td><span className="badge b-g">Admin</span></td><td>Tous les droits</td><td><span className="badge b-g">Actif</span></td></tr>
          <tr><td style={{fontWeight:500}}>Caissier 1</td><td><span className="badge b-b">Caissier</span></td><td>Vente civil uniquement</td><td><span className="badge b-g">Actif</span></td></tr>
          <tr><td style={{fontWeight:500}}>Pharmacien</td><td><span className="badge b-p">Pharmacien</span></td><td>Vente société + ordonnances</td><td><span className="badge b-g">Actif</span></td></tr>
        </tbody>
      </table>
      </div>
      <div style={{marginTop:16,display:'flex',gap:8}}>
        <button className="btn btn-primary"><User size={14}/> Ajouter utilisateur</button>
        <button className="btn btn-outline"><Shield size={14}/> Gérer les rôles</button>
      </div>
    </div>}

    {tab === 'sauvegarde' && <div className="card">
      <div className="card-title"><Database size={16}/> Sauvegarde & Restauration</div>
      <div className="form-grid">
        <div className="form-group"><label>Fréquence de sauvegarde</label><select><option>Quotidienne</option><option>Hebdomadaire</option><option>Manuelle</option></select></div>
        <div className="form-group"><label>Heure de sauvegarde</label><input type="time" defaultValue="22:00"/></div>
      </div>
      <div style={{marginTop:20,display:'flex',gap:16}}>
        <div style={{flex:1,background:'rgba(16,185,129,.05)',borderRadius:8,padding:16,border:'1px solid rgba(16,185,129,.2)'}}>
          <div style={{fontSize:12,color:'#64748b'}}>Dernière sauvegarde</div>
          <div style={{fontSize:14,fontWeight:600,color:'#10b981'}}>01/07/2026 à 22:00</div>
          <div style={{fontSize:11,color:'#64748b'}}>Taille: 48.5 Mo</div>
        </div>
        <div style={{flex:1,background:'rgba(59,130,246,.05)',borderRadius:8,padding:16,border:'1px solid rgba(59,130,246,.2)'}}>
          <div style={{fontSize:12,color:'#64748b'}}>Base de données</div>
          <div style={{fontSize:14,fontWeight:600,color:'#3b82f6'}}>592 produits • 17 244 facturations</div>
          <div style={{fontSize:11,color:'#64748b'}}>4 237 états de contrôle</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,marginTop:20}}>
        <button className="btn btn-primary"><Save size={14}/> Sauvegarder maintenant</button>
        <button className="btn btn-outline"><Upload size={14}/> Restaurer</button>
        <button className="btn btn-outline"><Download size={14}/> Exporter toutes les données</button>
      </div>
      <div style={{marginTop:20}}>
        <div style={{fontSize:13,fontWeight:600,color:'#e2e8f0',marginBottom:8}}>Import / Migration</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-outline"><Upload size={14}/> Importer depuis Access (.mdb)</button>
          <button className="btn btn-outline"><Upload size={14}/> Importer produits (Excel)</button>
          <button className="btn btn-outline"><Upload size={14}/> Importer travailleurs (Excel)</button>
        </div>
      </div>
    </div>}

    {tab === 'impression' && <div className="card">
      <div className="card-title"><Printer size={16}/> Configuration impression</div>
      <div className="form-grid">
        <div className="form-group"><label>Format facture société</label><select><option>A4 Portrait</option><option>A4 Paysage</option></select></div>
        <div className="form-group"><label>Format ticket civil</label><select><option>Ticket 80mm</option><option>A5</option><option>A4</option></select></div>
        <div className="form-group"><label>Afficher le logo sur les factures</label><select><option>Oui</option><option>Non</option></select></div>
        <div className="form-group"><label>Nombre de copies</label><input type="number" defaultValue={2}/></div>
        <div className="form-full" style={{display:'flex',justifyContent:'flex-end'}}><button className="btn btn-primary"><Save size={14}/> Enregistrer</button></div>
      </div>
    </div>}
  </>
}
