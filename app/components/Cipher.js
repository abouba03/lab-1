import React, { useState } from 'react';

const omophones = {
    'А': ['000', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    'Б': ['001', '101', '201', '301', '401', '501', '601', '701', '801', '901'],
    'В': ['002', '102', '202', '302', '402', '502', '602', '702', '802', '902'],
    'Г': ['003', '103', '203', '303', '403', '503', '603', '703', '803', '903'],
    'Д': ['004', '104', '204', '304', '404', '504', '604', '704', '804', '904'],
    'Е': ['005', '105', '205', '305', '405', '505', '605', '705', '805', '905'],
    'Ё': ['006', '106', '206', '306', '406', '506', '606', '706', '806', '906'],
    'Ж': ['007', '107', '207', '307', '407', '507', '607', '707', '807', '907'],
    'З': ['008', '108', '208', '308', '408', '508', '608', '708', '808', '908'],
    'И': ['009', '109', '209', '309', '409', '509', '609', '709', '809', '909'],
    'К': ['010', '110', '210', '310', '410', '510', '610', '710', '810', '910'],
    'Л': ['011', '111', '211', '311', '411', '511', '611', '711', '811', '911'],
    'М': ['012', '112', '212', '312', '412', '512', '612', '712', '812', '912'],
    'Н': ['013', '113', '213', '313', '413', '513', '613', '713', '813', '913'],
    'О': ['014', '114', '214', '314', '414', '514', '614', '714', '814', '914'],
    'П': ['015', '115', '215', '315', '415', '515', '615', '715', '815', '915'],
    'Р': ['016', '116', '216', '316', '416', '516', '616', '716', '816', '916'],
    'С': ['017', '117', '217', '317', '417', '517', '617', '717', '817', '917'],
    'Т': ['018', '118', '218', '318', '418', '518', '618', '718', '818', '918'],
    'У': ['019', '119', '219', '319', '419', '519', '619', '719', '819', '919'],
    'Ф': ['020', '120', '220', '320', '420', '520', '620', '720', '820', '920'],
    'Х': ['021', '121', '221', '321', '421', '521', '621', '721', '821', '921'],
    'Ц': ['022', '122', '222', '322', '422', '522', '622', '722', '822', '922'],
    'Ч': ['023', '123', '223', '323', '423', '523', '623', '723', '823', '923'],
    'Ш': ['024', '124', '224', '324', '424', '524', '624', '724', '824', '924'],
    'Щ': ['025', '125', '225', '325', '425', '525', '625', '725', '825', '925'],
    'Ъ': ['026', '126', '226', '326', '426', '526', '626', '726', '826', '926'],
    'Ы': ['027', '127', '227', '327', '427', '527', '627', '727', '827', '927'],
    'Ь': ['028', '128', '228', '328', '428', '528', '628', '728', '828', '928'],
    'Э': ['029', '129', '229', '329', '429', '529', '629', '729', '829', '929'],
    'Ю': ['030', '130', '230', '330', '430', '530', '630', '730', '830', '930'],
    'Я': ['031', '131', '231', '331', '431', '531', '631', '731', '831', '931'],
    " ": ["032"]
  };
  

function encrypt(text) {
  return Array.from(text.toUpperCase())
    .map(char => omophones[char] ? omophones[char][Math.floor(Math.random() * omophones[char].length)] : char)
    .join('');
}

function decrypt(ciphertext) {
  let decryptedText = '';
  for (let i = 0; i < ciphertext.length; i += 3) {
    const omophone = ciphertext.slice(i, i + 3);
    let foundChar = false;
    for (const char in omophones) {
      if (omophones[char].includes(omophone)) {
        decryptedText += char;
        foundChar = true;
        break;
      }
    }
    if (!foundChar) {
      decryptedText += omophone;
    }
  }
  return decryptedText;
}

function Cipher() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleToggleMode = () => {
    setIsDecrypting(!isDecrypting);
    setOutputText(''); // Réinitialiser le texte de sortie lorsque le mode est modifié
  };

  const handleProcess = () => {
    const resultText = isDecrypting ? decrypt(inputText) : encrypt(inputText);
    setOutputText(resultText);
  };

  return (
    <div className='text-center mt-20'>
      <h1 className='text-8xl mb-10'>Chiffre de substitution omophonique</h1>
      <textarea
        placeholder={isDecrypting ? 'Entrez le texte chiffré' : 'Entrez le texte à chiffrer'}
        value={inputText}
        onChange={handleInputChange}
      ></textarea>
      <div className='flex justify-center mt-10 gap-5'>
        <button className='border p-2' onClick={handleToggleMode}>
            {isDecrypting ? 'Mode Déchiffrement' : 'Mode Chiffrement'}
        </button>
        <button className='border p-2' onClick={handleProcess}>
            {isDecrypting ? 'Déchiffrer' : 'Chiffrer'}
        </button>
      </div>
      {outputText && (
        <div>
          <h2>{isDecrypting ? 'Texte déchiffré' : 'Texte chiffré'}</h2>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}

export default Cipher;
