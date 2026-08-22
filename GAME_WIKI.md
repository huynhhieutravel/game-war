# 📖 TỪ ĐIỂN GAME & SỔ TAY THIẾT KẾ (GAME WIKI & BIBLE)
# TỰA GAME: AGE OF WAR — FACTIONS & ELEMENTS (THỜI ĐẠI CHIẾN TRANH)

> **Tài liệu gốc thiết kế kiến trúc dài hạn (Master Game Design Document)**  
> Phiên bản: **Definitive Edition 3.0 (Master 3-Tier RPG Engine)**

---

## 🌟 MỤC LỤC
1. [Tầm Nhìn Kiến Trúc & Cốt Lõi Dự Án](#1-tầm-nhìn-kiến-trúc--cốt-lõi-dự-án)
2. [Hệ Thống Ngũ Hành Nguyên Tố (The 5 Elements)](#2-hệ-thống-ngũ-hành-nguyên-tố-the-5-elements)
3. [Bảng Chỉ Số Chuẩn 3 Tầng Toàn Diện (Master 3-Tier Stat Schema)](#3-bảng-chỉ-số-chuẩn-3-tầng-toàn-diện-master-3-tier-stat-schema)
4. [Công Thức Tính Sát Thương Chiến Đấu Toàn Diện](#4-công-thức-tính-sát-thương-chiến-đấu-toàn-diện)
5. [Hệ Thống Quân Giới Độc Lập Cho Từng Con Lính (Unit Armory)](#5-hệ-thống-quân-giới-độc-lập-cho-từng-con-lính-unit-armory)
6. [Từ Điển Tuyến Nhân Vật / Chủng Tộc (Factions Codex)](#6-từ-điển-tuyến-nhân-vật--chủng-tộc-factions-codex)
7. [Hệ Thống Boss Trùm & Chế Độ Chơi (Bosses & Modes)](#7-hệ-thống-boss-trùm--chế-độ-chơi-bosses--modes)
8. [Hướng Dẫn Mở Rộng Cho Lập Trình Viên (Developer Guide)](#8-hướng-dẫn-mở-rộng-cho-lập-trình-viên-developer-guide)

---

## 1. TẦM NHÌN KIẾN TRÚC & CỐT LÕI DỰ ÁN

Game được xây dựng theo mô hình **Chiến Thuật Thời Gian Thực Đối Kháng (Tug-of-War RTS) kết hợp chiều sâu RPG**:
- **Khả Năng Mở Rộng Vô Hạn (Faction-Agnostic Engine)**: Game Engine không bị gắn cứng vào bất kỳ một chủng tộc nào. Bất kỳ tuyến nhân vật mới nào cũng có thể được nạp động thông qua cấu hình `Faction Schema`.
- **Hệ Thống Nguyên Tố Khắc Chế (Tactical Depth)**: Người chơi không thể chỉ "spam" một loại lính mạnh nhất mà phải quan sát hệ nguyên tố và loại sát thương của đối phương để đưa ra quân cờ khắc chế.
- **Tiến Hóa Kép (Dual Evolution)**:
  1. *Tiến hóa vĩ mô*: Tiến hóa thời đại của Căn cứ (Age Evolution) mở khóa lính và tháp cấp cao.
  2. *Tiến hóa vi mô*: Nâng cấp Quân giới chuyên sâu (Unit Armory) cho từng cá thể lính.

---

## 2. HỆ THỐNG NGŨ HÀNH NGUYÊN TỐ (THE 5 ELEMENTS)

Mọi đơn vị lính, tướng, quái thú, tháp canh và tuyệt chiêu đều mang **1 Hệ Nguyên Tố**.

```
                        ┌────────────────────────┐
                        │   VÒNG TƯƠNG KHẮC      │
                        └───────────┬────────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
          🔥 HỎA (Fire)        🌿 MỘC (Wood)        💧 THỦY (Water)
        Khắc chế Mộc (+30%)  Khắc chế Thủy (+30%)  Khắc chế Hỏa (+30%)
               ▲                    ▲                    ▲
               └────────────────────┴────────────────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
       ☀️ ÁNH SÁNG (Light)                      🌑 BÓNG TỐI (Dark)
       Tương khắc đối kháng lẫn nhau (Gây 140% Sát thương lên nhau)
```

### 2.1 Bảng Ma Trận Hệ Số Sát Thương (Elemental Counter Matrix)
| Hệ Tấn Công \ Hệ Phòng Thủ | 🔥 HỎA | 🌿 MỘC | 💧 THỦY | ☀️ ÁNH SÁNG | 🌑 BÓNG TỐI |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **🔥 HỎA (Fire)** | 100% | **130%** ⚡ *(Khắc chế)* | 75% 🔻 *(Bị khắc)* | 100% | 100% |
| **🌿 MỘC (Wood)** | 75% 🔻 *(Bị khắc)* | 100% | **130%** ⚡ *(Khắc chế)* | 100% | 100% |
| **💧 THỦY (Water)** | **130%** ⚡ *(Khắc chế)* | 75% 🔻 *(Bị khắc)* | 100% | 100% | 100% |
| **☀️ ÁNH SÁNG (Light)** | 100% | 100% | 100% | 75% 🔻 | **140%** ⚡ *(Đối kháng)* |
| **🌑 BÓNG TỐI (Dark)** | 100% | 100% | 100% | **140%** ⚡ *(Đối kháng)* | 75% 🔻 |

---

## 3. BẢNG CHỈ SỐ CHUẨN 3 TẦNG TOÀN DIỆN (MASTER 3-TIER STAT SCHEMA)

Hệ thống chỉ số được phân thành **3 Tầng Rõ Ràng**:

```javascript
{
  // === TẦNG 1: SINH MỆNH, CƠ ĐỘNG & BẢO HỘ (SURVIVAL & MOBILITY) ===
  hp: 600,                     // Lượng máu tối đa của đơn vị
  shield: 100,                 // Lá chắn hấp thụ sát thương trước khi trừ vào máu
  physicalArmor: 25,           // Giáp vật lý (giảm % sát thương vật lý)
  magicResistance: 15,         // Kháng phép (giảm % sát thương phép thuật)
  tenacity: 0.20,              // Kháng khống chế (giảm 20% thời gian Choáng, Đóng Băng, Làm Chậm)
  hpRegen: 4.0,                // Lượng máu tự hồi phục mỗi giây (HP/s)
  moveSpeed: 70,               // Tốc độ di chuyển trên chiến trường (px/s)

  // === TẦNG 2: SỨC MẠNH CÔNG KÍCH & NGUYÊN TỐ (OFFENSE & ELEMENTS) ===
  physicalAttack: 40,          // Sát thương tấn công vật lý
  magicAttack: 20,             // Sát thương tấn công phép thuật
  trueDamage: 0,               // Sát thương chuẩn (bỏ qua 100% Giáp & Kháng Phép)
  element: "fire",             // Hệ nguyên tố ('fire' | 'wood' | 'water' | 'light' | 'dark')
  attackRange: 35,             // Tầm đánh tối đa (px)
  attackCooldown: 1.0,         // Thời gian hồi đòn đánh (giây)
  critRate: 0.15,              // Tỷ lệ bộc phát đòn chí mạng (15%)
  critDamage: 1.5,             // Hệ số sát thương chí mạng (150%)
  armorPenetration: 0.15,      // Tỷ lệ xuyên giáp vật lý (bỏ qua 15% giáp đối phương)
  magicPenetration: 0.10,      // Tỷ lệ xuyên kháng phép (bỏ qua 10% kháng phép đối phương)
  lifeSteal: 0.12,             // % Hút máu từ sát thương gây ra (hồi lại 12% máu)

  // === TẦNG 3: NĂNG LƯỢNG & KỸ NĂNG TUYỆT KỸ (ENERGY & ULTIMATE SKILL) ===
  maxMana: 100,                // Năng lượng tối đa để kích hoạt Tuyệt Kỹ Tự Động
  startingMana: 20,            // Năng lượng ban đầu khi vừa xuất trận
  manaPerAttack: 25,           // Lượng năng lượng tích lũy sau mỗi lần tung đòn
  aoeRadius: 0,                // Bán kính sát thương lan (0 = đơn mục tiêu, >0 = nổ lan)
  pierceCount: 1,              // Số lượng mục tiêu xuyên qua trên đường đạn

  // === THUỘC TÍNH KINH TẾ ===
  trainTime: 2.5,              // Thời gian huấn luyện ra quân (giây)
  cost: 45,                    // Giá mua (Vàng)
  xpReward: 60,                // XP thưởng khi bị hạ gục
  killBounty: 40               // Vàng thưởng khi bị hạ gục
}
```

---

## 4. CÔNG THỨC TÍNH SÁT THƯƠNG CHIẾN ĐẤU TOÀN DIỆN

### 4.1 Tính Giáp & Kháng Phép Sau Xuyên Phá:
- $\text{Effective Armor} = \max\Big(0, \text{Target Armor} \times (1 - \text{Attacker ArmorPen})\Big)$
- $\text{Effective MagicRes} = \max\Big(0, \text{Target MagicRes} \times (1 - \text{Attacker MagicPen})\Big)$

### 4.2 Giảm Trừ Sát Thương Theo Công Thức Diminishing Returns:
$$\text{Phys Dmg} = \text{Attacker PhysAtk} \times \frac{100}{100 + \text{Effective Armor}}$$
$$\text{Mag Dmg} = \text{Attacker MagAtk} \times \frac{100}{100 + \text{Effective MagicRes}}$$

### 4.3 Tổng Sát Thương Trừ Vào Máu & Lá Chắn:
$$\text{Mitigated Damage} = \Big(\text{Phys Dmg} + \text{Mag Dmg}\Big) \times \text{ElementalMultiplier} \times \text{CritMultiplier}$$
$$\text{Final Damage Taken} = \text{Mitigated Damage} + \text{Attacker TrueDamage}$$

### 4.4 Hút Máu (LifeSteal) & Hồi Máu Tự Nhiên:
- Khi gây ra $\text{Final Damage Taken}$, kẻ tấn công hồi phục: $\text{Heal} = \text{Final Damage Taken} \times \text{lifeSteal}$.
- Mỗi giây, đơn vị tự động hồi: $\text{hp} = \min(\text{maxHp}, \text{hp} + \text{hpRegen})$.

---

## 5. HỆ THỐNG QUÂN GIỚI ĐỘC LẬP CHO TỪNG CON LÍNH (UNIT ARMORY)

Mỗi đơn vị quân đều có **Bảng Nâng Cấp Quân Giới Cá Nhân (Personal Gear Tree)** gồm 3 nhánh:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚔️ NHÁNH 1: RÈN VŨ KHÍ CHUYÊN DỤNG (WEAPON MASTERY)                          │
│    - Tăng PhysAtk / MagAtk / ArmorPen / TrueDamage                          │
│    - Thức tỉnh hiệu ứng nguyên tố (Thiêu đốt, Đóng băng, Phá giáp)          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🛡️ NHÁNH 2: TÔI LUYỆN GIÁP TRỤ & KHIÊN (ARMOR & WARDING)                    │
│    - Tăng HP tối đa, Shield lá chắn, Giáp vật lý, Kháng phép và Tenacity    │
│    - Mở khóa Khiên Hộ Thể tự động tái tạo                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🧬 NHÁNH 3: BẢN NĂNG & PHÁP TRẬN NỘI TẠI (PASSIVE AWAKENING)                │
│    - Tăng tốc độ nạp Mana (ManaPerAttack), Hút Máu (LifeSteal), Hồi Máu    │
│    - Thức tỉnh Tuyệt Kỹ Tự Động khi thanh Mana đạt 100%                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. TỪ ĐIỂN TUYẾN NHÂN VẬT / CHỦNG TỘC (FACTIONS CODEX)

### 6.1 Đế Chế Nhân Loại (The Human Empire)
- **Hệ chủ đạo**: 🔥 Hỏa & ☀️ Ánh Sáng | **Đặc trưng**: Súng đạn, pháo cối, xe tăng bọc thép, sát thương tầm xa, chỉ số công thủ cân bằng.

### 6.2 Bầy Thú Vương & Khủng Long (Primal Beast Swarm)
- **Hệ chủ đạo**: 🌿 Mộc & 🔥 Hỏa Dung Nham | **Đặc trưng**: Máu cực lớn, chỉ số Hồi Máu Tự Nhiên (`hpRegen`) cao, Giẫm Đạp (Trample) và Tốc Chạy vượt trội.

### 6.3 Quân Đoàn Ma Giới & Hắc Ám (Undead & Nether Legion)
- **Hệ chủ đạo**: 🌑 Bóng Tối & 💧 Thủy Hàn | **Đặc trưng**: Hút Máu (`lifeSteal`) cao, Sát Thương Chuẩn (`trueDamage`), Bỏ Qua Giáp và Đóng Băng.

---

## 7. HỆ THỐNG BOSS TRÙM & CHẾ ĐỘ CHƠI (BOSSES & MODES)
1. 🦖 **Apex Tyrannosaurus Rex** (Age 1 - Hệ Hỏa): Tiếng gầm *Primal Roar* gây choáng diện rộng (bị giảm bởi `tenacity`).
2. 🐉 **Royal Fire Drake Dragon** (Age 2 - Hệ Hỏa): *Flame Sweep* phun luồng bão lửa AoE cực lớn.
3. ⚙️ **Steam Leviathan Juggernaut** (Age 3 - Hệ Hỏa): *Mortar Barrage* nã pháo công thành có bán kính nổ lan `aoeRadius` 80px.
4. ☢️ **Apocalypse Nuclear Fortress** (Age 4 - Hệ Hỏa): *Missile Salvo* phóng 4 tên lửa tầm xa có `armorPenetration` 40%.
5. 🌌 **God Mech Leviathan** (Age 5 - Hệ Ánh Sáng): *Singularity Beam* chùm tia laze `trueDamage` hủy diệt xuyên thấu toàn hàng lính.

---

## 9. QUY CHUẨN ĐỊNH DANH ID ĐỘC NHẤT & CẤU TRÚC THƯ MỤC MODULE HÓA

### 9.1 Cấu Trúc Thư Mục Chuẩn Hóa
```
src/
├── config/
│   ├── elements.js                 # 5 Hệ Ngũ Hành & Matrix tương khắc
│   ├── skills/                     # Toàn bộ Kỹ Năng theo Unique ID
│   │   ├── index.js                # SkillRegistry Master & tra cứu getSkillById()
│   │   ├── era_skills.js           # Tuyệt chiêu 5 thời đại (SKILL_ERA_*)
│   │   ├── tactical_skills.js      # Lệnh chỉ huy toàn cục (SKILL_TAC_*)
│   │   ├── boss_skills.js          # Kỹ năng đặc biệt của 5 Đại Boss (SKILL_BOSS_*)
│   │   └── unit_skills.js          # Kỹ năng nội tại & Tuyệt kỹ lính (SKILL_UNIT_*)
│   ├── factions/                   # Tuyến nhân vật & Chủng tộc
│   │   ├── index.js                # FactionRegistry Master
│   │   ├── human_faction.js        # Đế Chế Nhân Loại (Human)
│   │   ├── beast_faction.js        # Bầy Thú Vương & Khủng Long (Beast)
│   │   └── undead_faction.js       # Quân Đoàn Ma Giới & Hắc Ám (Undead)
│   ├── upgrades/                   # Hệ thống nâng cấp Quân Giới
│   │   ├── armory_upgrades.js      # 4 nhánh công nghệ Vũ khí, Giáp, Nội tại
│   │   └── base_upgrades.js        # Nâng cấp máu & tháp Căn cứ
│   └── bosses/
│       └── bosses_registry.js      # Cấu hình 5 Đại Boss
│
├── engine/
│   ├── SkillEngine.js              # Module thực thi hiệu ứng & sát thương Skill theo ID
│   ├── CombatEngine.js             # Tính toán sát thương 3 tầng, xuyên giáp, hút máu
│   ├── GameEngine.js               # Vòng lặp chính, điều phối trận đấu
│   ├── InputManager.js             # Xử lý phím bấm & chuột
│   ├── SoundManager.js             # Web Audio API synthesizer
│   └── Camera.js                   # Viewport pan, zoom, shake
│
├── entities/
│   ├── Unit.js                     # Thực thể Lính
│   ├── Base.js                     # Thực thể Căn cứ
│   ├── Turret.js                   # Thực thể Tháp phòng thủ
│   ├── Boss.js                     # Thực thể Đại Boss
│   └── Projectile.js               # Thực thể Đạn đạo & Phép thuật
│
└── render/ & ui/
```

### 9.2 Danh Mục Mã Định Danh Unique Skill IDs Bắt Buộc
| NHÓM KỸ NĂNG | MÃ UNIQUE ID | TÊN TIẾNG VIỆT | ĐẶC TÍNH SÁT THƯƠNG / HIỆU ỨNG |
| :--- | :--- | :--- | :--- |
| **Tactical** | `SKILL_TAC_FALLBACK_001` | Lệnh Rút Quân | Quân lùi về pháo đài, giảm 25% sát thương |
| **Tactical** | `SKILL_TAC_CHARGE_002` | Lệnh Xung Phong | +50% Tốc chạy, +25% Tốc đánh trong 6s (CD 20s) |
| **Era Skill** | `SKILL_ERA_METEOR_SWARM_101` | Mưa Thiên Thạch | 12 quả thiên thạch nổ diện rộng 65 DMG/quả |
| **Era Skill** | `SKILL_ERA_ARROW_STORM_102` | Bão Tên Lửa | 25 mũi tên lửa quét sạch tiền tuyến 40 DMG/mũi |
| **Era Skill** | `SKILL_ERA_ARTILLERY_BARRAGE_103`| Bão Pháo Kích | 8 quả đại bác công phá mặt đất 200 DMG/phát |
| **Era Skill** | `SKILL_ERA_B52_CARPET_BOMB_104` | Thảm Bom B-52 | 15 quả bom nhiệt hạch hủy diệt 280 DMG/quả |
| **Era Skill** | `SKILL_ERA_ORBITAL_ION_LASER_105`| Tia Laze Quỹ Đạo | Chùm tia quét sạch bản đồ 550 DPS + 150 True DMG |
| **Boss Skill** | `SKILL_BOSS_PRIMAL_ROAR_801` | Tiếng Gầm Bạo Chúa | Choáng toàn bộ quân lính 2s (bị giảm bởi Tenacity) |
| **Boss Skill** | `SKILL_BOSS_FLAME_SWEEP_802` | Bão Lửa Quét Tuyến | Phun 3 quả cầu lửa nổ lan 80px |
| **Boss Skill** | `SKILL_BOSS_MORTAR_BARRAGE_803` | Pháo Cối Hơi Nước | Bắn loạt 3 quả cối công thành 220 DMG |
| **Boss Skill** | `SKILL_BOSS_MISSILE_SALVO_804` | Tên Lửa Hạt Nhân | Phóng 4 tên lửa tầm xa có Xuyên Giáp 40% |
| **Boss Skill** | `SKILL_BOSS_SINGULARITY_BEAM_805`| Chùm Tia Không Gian | Quét chùm tia Sát Thương Chuẩn xuyên thấu toàn tuyến |
| **Unit Skill** | `SKILL_UNIT_SHIELD_BLOCK_501` | Đỡ Khiên Hoàng Gia | Chặn giảm 25% sát thương từ đạn tầm xa |
| **Unit Skill** | `SKILL_UNIT_EXPLOSIVE_SHELL_502`| Đạn Pháo Nổ Lan | Gây sát thương nổ lan diện rộng trong bán kính AoE |
| **Unit Skill** | `SKILL_UNIT_PLASMA_BARRIER_503` | Trường Lực Lượng Tử | Tạo giáp ảo Shield 800 và tự hồi 20 Shield/giây |
| **Unit Skill** | `SKILL_UNIT_AUTO_ULTIMATE_506` | Thức Tỉnh Năng Lượng | Đầy 100% Mana tự động nổ tia sét và nhận +60 Lá Chắn! |

---
*Tài liệu được cập nhật: 2026-08-21 | Phiên bản kiến trúc: Definitive Edition 3.0 (Enterprise Modular Layout & Skill ID System)*

