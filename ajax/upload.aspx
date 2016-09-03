<%@ Page Language="C#" AutoEventWireup="true"%>
<script runat="server">
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpPostedFile file = Request.Files[0];


            Random ran=new Random();
            int RandKey2=ran.Next(10000,20000);

            int RandKey = 0;

            for( int i=0; i<RandKey2; i++ ){
                RandKey=ran.Next(1,200000);
            }



            string fileName = DateTime.Now.ToString("yyMMddhhmmsssss") + RandKey.ToString() + file.FileName.Substring(file.FileName.LastIndexOf('.')).ToLower();

            string filePath = Server.MapPath("~/") + "ajax/uploads/" + fileName;


            /*if (System.IO.Directory.Exists(cover_pathbase)) System.IO.Directory.Delete(cover_pathbase, true);
            System.IO.Directory.CreateDirectory(cover_pathbase);*/

            file.SaveAs(filePath);

            Response.Write("{\"code\": 0,\"data\": {\"imageId\":1,\"imgName\": \""+fileName+"\",\"folderId\": 0,\"imgPath\": \"/ajax/uploads/"+fileName+"\"},\"desc\": \"\"}");
        }
</script>
