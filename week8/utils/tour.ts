export interface Tour {
    id: string;
    name: string;
    city: string;
    days: number;
    price: number;
    seats: number;
    departure: string; // YYYY-MM-DD
    image: string;
    isFavorite: boolean;
  }
  
  export interface TourGroup {
    title: string;
    data: Tour[];
  }
  
  // Câu 2a: Nhóm tour theo thành phố
  export const groupByCity = (tours: Tour[]): TourGroup[] => {
    const groupsMap: { [key: string]: Tour[] } = {};
  
    tours.forEach((tour) => {
      if (!groupsMap[tour.city]) {
        groupsMap[tour.city] = [];
      }
      groupsMap[tour.city].push(tour);
    });
  
    // Sắp xếp các nhóm theo tên thành phố A -> Z
    const sortedCities = Object.keys(groupsMap).sort((a, b) =>
      a.localeCompare(b, 'vi', { sensitivity: 'base' })
    );
  
    return sortedCities.map((city) => {
      // Sắp xếp các tour trong nhóm theo departure tăng dần
      const sortedTours = groupsMap[city].sort(
        (a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime()
      );
  
      return {
        title: city,
        data: sortedTours,
      };
    });
  };
  
  // Câu 3c: Format ngày "YYYY-MM-DD" -> "DD/MM/YYYY"
  export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };
  
  // Câu 3c: Lấy nhãn số chỗ
  export const getSeatLabel = (seats: number): string => {
    if (seats <= 0) {
      return 'Hết chỗ';
    }
    if (seats >= 1 && seats <= 3) {
      return `Chỉ còn ${seats} chỗ`;
    }
    return `Còn ${seats} chỗ`;
  };
  
  // Format tiền tệ VNĐ
  export const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };