$(document).ready(function () {
    var textdv = getStorage('_utenDonVi');
    if (ValidNotNull(textdv))
        $(".text-donvi-header").html(textdv);
    else
        $(".text-donvi-header").html('');
})
function ActiveMenu() {
    var url = window.location.pathname;
    if (url == '/') {
        $('.sidebar-link').removeClass('active');
        $('#menu-1').addClass('active');
    }
    else {
        var trangChu = [
            '/giao-vien/soan-tin',
            '/giao-vien/soan-tin-da-phuong-tien-gui-hoc-sinh',
            '/giao-vien/soan-tin-sms-gui-hoc-sinh',
            '/giao-vien/ke-hoach-hoc-tap',
            '/phu-huynh/ke-hoach-hoc-tap',
            '/tin-noi-bat',
            '/media-box'
        ];
        ActiveForMenu(trangChu, 1);
        var hopThu = [
            '/hop-thu'
        ];
        ActiveForMenu(hopThu, 3);
        var danhBa = [
            '/danh-ba'
        ];
        ActiveForMenu(danhBa, 5);
    }
};
function ActiveForMenu(arr, numberActive) {
    var url = window.location.pathname;
    for (key in arr) {
        if (url.includes(arr[key])) {
            $('.sidebar-link').removeClass('active');
            $('#menu-' + numberActive).addClass('active');
            return;
        }
    }
}
function Logout() {
    removeAllStorage();
    setCookie('_uguid','')
    window.location.href = "/dang-xuat";
}
function SetRoleUser(typeU) {
    removeAllStorage();
    var data = { type: typeU };
    $.ajax({
        url: '/chon-quyen',
        type: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: function (data) {
            window.location.href = data.link;
        }
    });
}


function LoadNotifireSuccess(check) {
    if (check)
        toastr.success('Cập nhật dữ liệu thành công', 'Thành công!', { positionClass: 'toastr toast-bottom-right', containerId: 'toast-bottom-right' });
    else
        toastr.error('Cập nhật dữ liệu không thành công', 'Lỗi!', { positionClass: 'toastr toast-bottom-right', containerId: 'toast-bottom-right' });
}
function LoadNotifire(check, message) {
    if (check)
        toastr.success(message, 'Thành công!', { positionClass: 'toastr toast-bottom-right', containerId: 'toast-bottom-right' });
    else
        toastr.error(message, 'Lỗi!', { positionClass: 'toastr toast-bottom-right', containerId: 'toast-bottom-right' });
}
function ValidNullOffEmty(input) {
    var vl = $("#" + input).val();
    if (vl === "") {
        $("#" + input).addClass("input-validation-error");
        $("#" + input).focus();
        $("#" + input + "-error").html("Yêu cầu nhập giá trị.");
        return false;
    }
    else {
        $("#" + input).removeClass("input-validation-error");
        $("#" + input + "-error").html("");
        return true;
    }
}

function ValidSelect2(input) {
    var dataMH = $('#' + input).select2('val').replace('? undefined:undefined ?', '').trim();
    if (!ValidNotNull(dataMH)) {
        $('#' + input).parent().find(".select2-selection").addClass("input-validation-error");
        $("#" + input).focus();
        $("#" + input + "-error").html("Yêu cầu nhập giá trị.");
        return false;
    }
    else {
        $('#' + input).parent().find(".select2-selection").removeClass("input-validation-error");
        $("#" + input + "-error").html("");
        return true;
    }
}
function ValidSelect2Multil(input) {
    var dataMH = $('#' + input).select2('val');
    if (!ValidNotNull(dataMH)) {
        $('#' + input).parent().find(".select2-selection").addClass("input-validation-error");
        $("#" + input).focus();
        $("#" + input + "-error").html("Yêu cầu nhập giá trị.");
        return false;
    }
    else {
        $('#' + input).parent().find(".select2-selection").removeClass("input-validation-error");
        $("#" + input + "-error").html("");
        return true;
    }
}
function CheckLoadIframe() {
    loading(true);
    setTimeout(function () {
        $('#iframe').on('load', function () {
            loading(false);
        });
    }, 100);
    setTimeout(function () {
        loading(false);
    }, 3000);
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getStorage(name) {
    return localStorage.getItem(name);
}
function setStorage(name, value) {
    localStorage.setItem(name, value);
}
function removeStorageByName(name) {
    localStorage.removeItem(name);
}
function removeAllStorage() {
    localStorage.clear();
}
function keyU() {
    var roleSelected = $('meta[name=roleselect]').attr('content');
    var userGuid = getCookie('_uguid');
    return roleSelected + "_" + userGuid;
}
function lopU() {
    return getStorage('_ulopkey');
}
function truongU() {
    return getStorage('_utruongkey');
}
function tenDonViU() {
    return getStorage('_utenDonVi');
}
function UrlRewrite(key) {
    var userType = $('meta[name=roleselect]').attr('content');
    if (key == 'gui_thong_bao_hoc_sinh_ver2')
        return '/giao-vien/soan-tin';
    if (key == 'hop_thu_den')
        return '/hop-thu';
    if (key == 'ke_hoach_hoc_tap_ver2') {
        //=2 : giáo viên
        if (userType == '2') {
            return '/giao-vien/ke-hoach-hoc-tap';
        }
        else if (userType == '3') {// phụ huynh
            return '/phu-huynh/ke-hoach-hoc-tap';
        }

    }

    return '/tinh-nang-dang-phat-trien';
}
function uploadFilesDocument(inputId, urlPost) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var countf = 0;
    if (files.length > 0) {
        var formData = new FormData();
        for (var i = 0; i != files.length; i++) {
            const exten = files[i].name.split('.').pop().toLowerCase();
            if (exten == 'doc' || exten == 'docx' || exten == 'png' || exten == 'jpg' || exten == 'jpeg' || exten == 'pdf' || exten == 'pdf' || exten == 'xls' || exten == 'xlsx' || exten == 'pptx' || exten == 'ppt') {
                formData.append("files", files[i]);
                countf++;
            }
        }
        if (countf > 0) {
            $.ajax(
                {
                    url: urlPost,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    xhr: function () {
                        loadingProcess(0);
                        $('.loadingprocess').show();
                        blockUI();
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                loadingProcess(Math.round((evt.loaded / evt.total)));
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (Item) {
                        var arrFile = $("#arrfile").val().trim() != '' ? $("#arrfile").val().split(",") : [];
                        for (var i = 0; i < Item.data.length; i++) {
                            arrFile.push(Item.data[i].url_file)
                            var dinhDang = '';
                            formatFile = FormatFile(Item.data[i].origin_name);
                            var classRemove = Item.data[i].file_name.split('.')[0];
                            dinhDang += '<label style="position: relative;" class="btn ' + classRemove + ' btn-rounded ng-binding ng-scope"><i class="fas ' + formatFile + '" ></i>' + Item.data[i].origin_name + '<a class="btn mb-0 phuhuynh-img" onclick="removeFileHttb(\'' + Item.data[i].url_file + '\',\'' + classRemove+'\')"><i class="mdi mdi-close"></i></a></label>'
                            $('#noidungsp').prepend(dinhDang);
                            setTimeout(function () {
                                $(".loadingprocess").hide(1000);
                            }, 1000);
                        }
                        $("#arrfile").val(arrFile);
                    },
                    complete: function (xhr) {
                        if (xhr.status == 200) {
                            unblockUI();
                            loadingProcess(100);
                        }
                    }
                }
            );
        }
        else {
            alert('Vui lòng kiểm tra lại tệp tải lên. Hệ thống chỉ chấp nhận các file Word, Excel, Pdf, PowerPoint, các file ảnh')
        }
    }
}
function removeFileHttb(item, thisRemove) {
    Swal.fire({
        title: '',
        text: "Bạn muốn xóa file này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Đóng'
    }).then((result) => {
        if (result.isConfirmed) {
            var arrFile = $("#arrfile").val().split(",");
            if (ValidNotNull(arrFile)) {
                var arrFilekq = [];
                for (var i = 0; i < arrFile.length; i++) {
                    if (arrFile[i].trim() != item.trim()) {
                        arrFilekq.push(arrFile[i]);
                    }
                    else {
                        $('.' + thisRemove).remove();
                    }
                }
                document.getElementById('files').value = "";
                $("#arrfile").val(arrFilekq);
            }
        }
    })
}

function loadingProcess(value) {
    $(".loadingprocess .progress-bar").css("width", value + "%").attr("aria-valuenow", value);
    $(".loadingprocess .progress-bar").html(value + "%");
}

function FormatFile(url) {
    var ext = url.split('.').pop();
    if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'gif')
        return 'fa-image';
    if (ext == 'doc' || ext == 'docx')
        return 'fa-file-word';
    if (ext == 'xls' || ext == 'xlsx')
        return 'fa-file-excel';
    if (ext == 'pdf')
        return 'fa-file-pdf';
    if (ext == 'pptx' || ext == 'pptm' || ext == 'ppt')
        return 'fa-file-powerpoint';
    if (ext == 'txt')
        return 'fa-sticky-note';
}
function LoadCkeditor(nameck) {
    CKEDITOR.replace(nameck, {
        entities: false,
        customConfig: '../ckeditor/config.js',
        height: '287px'
    });

}
function ValidNotNull(value) {
    if (value == null || value == undefined || value.length == 0 || value == 'undefined' || value == 'null')
        return false;
    return true;
}

function RunVideo(link, imagedefallt, element) {
    jwplayer(element).setup({
        file: link,
        autostart: false,
        mute: false,
        image: imagedefallt,
        title: '',
        width: '100%',
        repeat: false,
        aspectratio: "16:9"
    });
}
function GetUrlMedia() {
    return decodeURIComponent(getCookie('_umedia'));
}
function CheckLoginWhenCallBack() {
    var check = getCookie('_uguid');
    if (!ValidNotNull(check))
        window.location.href = '/dang-nhap';
}
function CheckWidthMobile() {
    var widthbr = $(window).width();
    if (widthbr <= 768)
        window.location.href = 'https://app.enetviet.com';
}
function AcPermission(item) {
    if (ValidNotNull(item) && ValidNotNull(item.error) && item.error!=200)
        window.location.href = '/page-error?er=' + item.error + '&ms=' + item.mes;
}