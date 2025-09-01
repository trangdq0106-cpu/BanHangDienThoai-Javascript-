var http = require("http");
var port = 8080;
var File = require("fs");
var Xu_ly_Tham_so = require('querystring');
var Luu_tru = require("../Xu_ly/XL_LUU_TRU_KHACH_HANG")
var Du_lieu_Khach_hang

Khoi_dong_Du_lieu_Ung_dung_Khach(Du_lieu => {
    Du_lieu_Khach_hang = Du_lieu
})

function Khoi_dong_Du_lieu_Ung_dung_Khach(Ham_Xu_ly_Sau_khi_Khoi_dong) {
    var Chuoi_Tham_so = "Ma_so_Xu_ly=Doc_Danh_sach_Dien_thoai"

    Luu_tru.Kich_hoat_Dich_vu_Du_lieu(Chuoi_Tham_so, "",
        (Du_lieu) => {
            Ham_Xu_ly_Sau_khi_Khoi_dong(Du_lieu)
        })

}

var DV_Ban_dien_thoai = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = ""
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Loai_Doi_tuong = Tham_so.Loai_Doi_tuong
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        var Ngay_Hien_hanh = new Date()
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "Doc_Danh_sach_Dien_thoai") {
                var Du_lieu = {}
                try {
                    Du_lieu.Danh_sach_Dien_thoai = []
                    Du_lieu_Khach_hang.Danh_sach_Dien_thoai.forEach(Dien_thoai_Goc => {
                        var Dien_thoai = Object.assign({}, Dien_thoai_Goc)
                        Du_lieu.Danh_sach_Dien_thoai.push(Dien_thoai)
                        delete Dien_thoai.Danh_sach_Phieu_Ban
                        delete Dien_thoai.Danh_sach_Phieu_Nhap
                        delete Dien_thoai.Danh_sach_Phieu_Dat
                    })

                    Du_lieu.Cua_hang = Du_lieu_Khach_hang.Cua_hang
                    Du_lieu.Danh_sach_Thanh_ly=Du_lieu_Khach_hang.Danh_sach_Thanh_ly
                }
                catch (Loi) {
                    Du_lieu.Ma_so_Loi = {
                        'Loi': 'Lỗi Dịch vụ'
                    }
                }
                Chuoi_Kq = JSON.stringify(Du_lieu)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Chuoi_Kq);
            }

        })
    })

DV_Ban_dien_thoai.listen(port, function () {
    console.log("Dịch vụ Khách hàng đang chạy trên cổng ...", port)
});

