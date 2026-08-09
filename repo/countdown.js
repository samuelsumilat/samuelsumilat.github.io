async function fetchData() {
  try {
    const response = await fetch("data-input/data.txt");
    const text = await response.text();
    return parseDataFile(text);
  } catch (error) {
    console.error("Gagal memuat data:", error);
    return null;
  }
}

function parseDataFile(data) {
  const lines = data.split('\n');
  const result = {};

  for (const line of lines) {
    if (!line.trim() || line.startsWith("==========")) {
      continue;
    }

    const index = line.indexOf(':');

    if (index !== -1) {
      const key = line.substring(0, index).trim();
      const value = line.substring(index + 1).trim();
      result[key] = value;
    }
  }

  return result;
}

function parseDate(dateString) {
  dateString = dateString.replace(",", "");

  const months = {
    "Januari": 1,
    "Februari": 2,
    "Maret": 3,
    "April": 4,
    "Mei": 5,
    "Juni": 6,
    "Juli": 7,
    "Agustus": 8,
    "September": 9,
    "Oktober": 10,
    "November": 11,
    "Desember": 12
  };

  const parts = dateString.split(" ");

  return {
    day: parseInt(parts[1], 10),
    month: months[parts[2]],
    year: parseInt(parts[3], 10)
  };
}

function parseTime(timeString) {
  const parts = timeString.match(/(\d+)\.(\d+)/);

  return {
    hours: parts ? parseInt(parts[1], 10) : 0,
    minutes: parts ? parseInt(parts[2], 10) : 0
  };
}

async function initializeCountdown() {
  const data = await fetchData();

  if (!data) {
    return;
  }

  const acaraDate = parseDate(data["tanggal-acara1"]);
  const acaraTime = parseTime(data["waktu-acara1"]);

  simplyCountdown('.simply-countdown', {
    year: acaraDate.year,
    month: acaraDate.month,
    day: acaraDate.day,
    hours: acaraTime.hours,
    minutes: acaraTime.minutes,
    seconds: 0,
    words: {
      days: {
        singular: 'hari',
        plural: 'hari'
      },
      hours: {
        singular: 'jam',
        plural: 'jam'
      },
      minutes: {
        singular: 'menit',
        plural: 'menit'
      },
      seconds: {
        singular: 'detik',
        plural: 'detik'
      }
    }
  });
}

initializeCountdown();