INSERT INTO products
  (slug, name, origin_country, origin_region, altitude_m, roast_level, process, tasting_notes, lot_number, roast_date, price_cents, weight_grams, stock, image_url, description, is_featured)
VALUES
('yirgacheffe-kochere', 'Yirgacheffe Kochere', 'Ethiopia', 'Kochere, Yirgacheffe', 1950, 'light', 'washed',
  'ดอกมะลิ, เบอร์กาม็อต, พีชขาว', 'ET-24-118', '2026-08-10', 42000, 200, 34,
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
  'กาแฟล้างจากที่ราบสูงยีร์กาเชฟ กลิ่นดอกไม้ชัดเจน รสส้มและชาดำอ่อนๆ ทิ้งท้ายด้วยความหวานคล้ายน้ำผึ้ง', true),

('huila-pink-bourbon', 'Huila Pink Bourbon', 'Colombia', 'Huila', 1800, 'light', 'honey',
  'สตรอว์เบอร์รี, คาราเมล, ส้มแดง', 'CO-24-092', '2026-08-14', 45000, 200, 21,
  'https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=800',
  'สายพันธุ์พิงก์เบอร์บอนหายาก แปรรูปแบบฮันนี่ ให้ความหวานฉ่ำแบบผลไม้แดงและโครงสร้างรสที่ซับซ้อน', true),

('nyeri-aa', 'Nyeri AA', 'Kenya', 'Nyeri', 1750, 'medium', 'washed',
  'มะเขือเทศ, แบล็คเคอแรนท์, น้ำตาลทรายแดง', 'KE-24-076', '2026-08-05', 46000, 200, 18,
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
  'เกรด AA จากที่สูงเนียรี รสเปรี้ยวหวานแบบเบอร์รี่เข้มข้น โครงสร้างรสหนักแน่นเป็นเอกลักษณ์เคนยา', false),

('sidamo-natural', 'Sidamo Natural', 'Ethiopia', 'Sidamo', 2000, 'light', 'natural',
  'บลูเบอร์รี่, ช็อกโกแลตขาว, ไวน์แดง', 'ET-24-131', '2026-08-18', 43500, 200, 27,
  'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800',
  'ตากแห้งทั้งผลบนราวไม้ไผ่ ให้กลิ่นหอมฟุ้งแบบผลไม้หมัก รสชาติเข้มข้นคล้ายไวน์', false),

('minas-gerais-daterra', 'Minas Gerais Daterra', 'Brazil', 'Cerrado', 1100, 'medium', 'natural',
  'ถั่วอบ, คาราเมล, ช็อกโกแลตนม', 'BR-24-204', '2026-08-02', 38000, 250, 40,
  'https://images.unsplash.com/photo-1524350876685-274059332603?w=800',
  'ตัวกลมกล่อม บอดี้หนักแน่น เหมาะทั้งดริปและเอสเพรสโซ รสถั่วคาราเมลที่คุ้นเคยแต่ไม่จำเจ', false),

('tarrazu-la-pastora', 'Tarrazú La Pastora', 'Costa Rica', 'Tarrazú', 1650, 'medium', 'honey',
  'น้ำผึ้ง, แอปเปิ้ลแดง, อัลมอนด์', 'CR-24-055', '2026-08-08', 44000, 200, 15,
  'https://images.unsplash.com/photo-1524350876685-274059332603?w=800',
  'ปลูกในไมโครมิลชื่อดังของตาราซู แปรรูปฮันนี่ให้ความหวานละมุนคล้ายน้ำผึ้งดอกไม้ป่า', false),

('toraja-sapan', 'Toraja Sapan', 'Indonesia', 'Sulawesi', 1500, 'dark', 'washed',
  'สมุนไพร, ดินชื้น, ดาร์กช็อกโกแลต', 'ID-24-311', '2026-07-29', 41000, 250, 22,
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800',
  'คั่วเข้มสไตล์ดั้งเดิม บอดี้หนักหนึบ กลิ่นดินและสมุนไพรเฉพาะตัวของสุลาเวสี', false),

('sumatra-mandheling', 'Sumatra Mandheling', 'Indonesia', 'Aceh', 1300, 'dark', 'natural',
  'ไม้ซีดาร์, เครื่องเทศ, โกโก้', 'ID-24-298', '2026-07-25', 39500, 250, 30,
  'https://images.unsplash.com/photo-1442411210355-3303c8f6be44?w=800',
  'คั่วเข้มแบบคลาสสิก บอดี้หนักที่สุดในไลน์อัพ เหมาะกับคนชอบกาแฟรสจัดจ้าน', false),

('finca-el-injerto', 'Finca El Injerto', 'Guatemala', 'Huehuetenango', 1900, 'light', 'washed',
  'องุ่นเขียว, มะนาว, น้ำตาลอ้อย', 'GT-24-147', '2026-08-16', 48000, 200, 12,
  'https://images.unsplash.com/photo-1587734195503-904fca47e0d9?w=800',
  'จากไร่รางวัลระดับ Cup of Excellence รสสดใสของผลไม้เมืองหนาว ความสะอาดของรสชาติในระดับพรีเมียม', true);