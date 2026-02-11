import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Modal, FlatList } from 'react-native';

// นำเข้าสมอง AI (ตรวจสอบให้แน่ใจว่าสร้างไฟล์ utils/translator.ts แล้วนะครับ)
import { translateImageWithAI } from '../utils/translator';

// 🛑 เราจะทำระบบจำลอง (Mock) ไปก่อน เพื่อให้หน้าจอแอปเปิดติด 100%
const startPiP = (text: string) => "เปิดระบบจำลองสำเร็จ!";
const stopPiP = () => "ปิดระบบจำลองเรียบร้อย!";

// ประกาศ Type
type Language = {
  id: string;
  name: string;
};

const LANGUAGES: Language[] = [
  { id: 'th', name: '🇹🇭 ไทย' },
  { id: 'en', name: '🇺🇸 อังกฤษ' },
  { id: 'jp', name: '🇯🇵 ญี่ปุ่น' },
  { id: 'cn', name: '🇨🇳 จีน' },
  { id: 'kr', name: '🇰🇷 เกาหลี' },
];

export default function App() {
  const [isServiceRunning, setIsServiceRunning] = useState(false);
  const [sourceLang, setSourceLang] = useState<Language>(LANGUAGES[2]); 
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES[0]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingType, setSelectingType] = useState<'source' | 'target'>('source'); 

  // 🧠 State สำหรับเก็บผลแปลทดสอบ
  const [testTranslation, setTestTranslation] = useState<string>("ยังไม่ได้ทดสอบ");

  // 🧠 ฟังก์ชันทดสอบการแปล
  const runTestTranslation = async () => {
    setTestTranslation("⏳ กำลังให้ AI แปล...");
    // รหัสภาพจำลอง
    const sampleBase64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; 
    
    const result = await translateImageWithAI(sampleBase64Image, sourceLang.name, targetLang.name);
    setTestTranslation(result);
  };

  const openLanguageSelector = (type: 'source' | 'target') => {
    setSelectingType(type);
    setModalVisible(true);
  };

  const selectLanguage = (lang: Language) => {
    if (selectingType === 'source') setSourceLang(lang);
    else setTargetLang(lang);
    setModalVisible(false);
  };

  const toggleService = (value: boolean) => {
    setIsServiceRunning(value);
    if (value) {
      const response = startPiP("กำลังรอคำแปล...");
      alert(response);
    } else {
      const response = stopPiP();
      alert(response);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>แอปแปลหน้าจอ (PiP Mode)</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>ตั้งค่าภาษา</Text>
        <View style={styles.languageSelectorRow}>
          <TouchableOpacity style={styles.langButton} onPress={() => openLanguageSelector('source')}>
            <Text style={styles.langButtonText}>{sourceLang.name}</Text>
          </TouchableOpacity>
          <Text style={styles.arrowText}>➔</Text>
          <TouchableOpacity style={styles.langButton} onPress={() => openLanguageSelector('target')}>
            <Text style={styles.langButtonText}>{targetLang.name}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>สถานะการทำงาน</Text>
        <View style={styles.switchRow}>
          <Text style={styles.statusText}>
            {isServiceRunning ? "🟢 กำลังทำงาน (พร้อมแปล)" : "🔴 ปิดการทำงาน"}
          </Text>
          <Switch value={isServiceRunning} onValueChange={toggleService} />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, isServiceRunning ? styles.buttonActive : styles.buttonInactive]}
        onPress={() => alert(isServiceRunning ? "ระบบพร้อมแล้ว ลากหน้าจอลงมาอัดวิดีโอได้เลย!" : "โปรดเปิดสวิตช์ก่อนครับ")}
      >
        <Text style={styles.buttonText}>
          {isServiceRunning ? "ระบบพร้อมแล้ว ลุยเลย!" : "เปิดสวิตช์เพื่อใช้งาน"}
        </Text>
      </TouchableOpacity>

      {/* --- ปุ่มทดสอบ AI วางไว้ตรงนี้อย่างสวยงาม --- */}
      <View style={[styles.card, { marginTop: 15, backgroundColor: '#e6f7ff' }]}>
        <Text style={styles.label}>ทดสอบระบบ AI (แปลภาษา)</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#00b0ff' }]} onPress={runTestTranslation}>
          <Text style={styles.buttonText}>🧪 ทดสอบแปลภาพจำลอง</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 15, fontSize: 16, color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
          ผลลัพธ์: {testTranslation}
        </Text>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>เลือกภาษา{selectingType === 'source' ? 'ต้นทาง' : 'ปลายทาง'}</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectLanguage(item)}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5', padding: 20, paddingTop: 80 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 3 },
  label: { fontSize: 14, color: '#888', marginBottom: 10 },
  languageSelectorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  langButton: { flex: 1, backgroundColor: '#f0f4ff', padding: 15, borderRadius: 10, alignItems: 'center' },
  langButtonText: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  arrowText: { fontSize: 20, color: '#aaa', marginHorizontal: 15 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusText: { fontSize: 16, fontWeight: '500', color: '#333' },
  button: { padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  buttonInactive: { backgroundColor: '#ccc' },
  buttonActive: { backgroundColor: '#007AFF' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '50%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalItemText: { fontSize: 18, textAlign: 'center' },
  closeButton: { marginTop: 15, padding: 15, backgroundColor: '#ff3b30', borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
