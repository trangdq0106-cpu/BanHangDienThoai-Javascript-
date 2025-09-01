var http = require("http");
class XL_LUU_TRU {

    Kich_hoat_Dich_vu_Du_lieu(Tham_so, Chuoi_Goi,Ham_Xu_ly_Sau_khi_Thuc_hien) {
        var Cau_hinh = {
            host: "localhost",
            port: 1000,
            path: "/" + Tham_so,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer token"
            }
        };

        var Xu_ly_HTTP = http.request(Cau_hinh, (Dap_ung) => {
            var Chuoi_Kq = "";
            Dap_ung.on("data", (data) => {
                Chuoi_Kq += data;
            });
            
            Dap_ung.on("end", () => {
                var Doi_tuong_Kq = JSON.parse(Chuoi_Kq)
                Ham_Xu_ly_Sau_khi_Thuc_hien(Doi_tuong_Kq)
            });
            Dap_ung.on("error", (data) => {
                console.log(data)
            });
        });
        Xu_ly_HTTP.write(Chuoi_Goi);
        Xu_ly_HTTP.end()
    }
}

var Xu_ly = new XL_LUU_TRU()
module.exports = Xu_ly
