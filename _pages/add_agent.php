<?php //include("../session.php"); 
/*

if($_SESSION['type']!='sub_admin' && $_SESSION['type']!='admin')
{
session_destroy();
header('Location:index.php');	
}

*/
//error_reporting(0);
include("../model.php");
$db=new model();
include("../controler.php");

?>






<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Aqua_Arise | Add Agent</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- fullCalendar 2.2.5-->
    <link rel="stylesheet" href="../plugins/fullcalendar/fullcalendar.min.css">
    <link rel="stylesheet" href="../plugins/fullcalendar/fullcalendar.print.css" media="print">
    <!-- Theme style -->
    <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">

	
	
      <?php include("header.php"); ?>
	  
	  <?php include("aside_menu_superadmin.php"); ?>
	  
	 

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Agent
            <small>Add New</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="../index"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Add New Agent</li>
          </ol>
        </section>
<!-- Main content -->
        <section class="content">
          <div class="row">
            <!-- left column -->
<?php 
					if(isset($reg)){ ?>          
		  <div class="col-md-12">
			<div class="callout callout-success">
					
				<?php	echo $reg;  ?>
                  </div><!-- /.box-footer -->
			
			</div> <?php } ?>
            <div class="col-md-6">
              <!-- Horizontal Form -->
            <div class="box box-primary">
                <div class="box-header with-border">
                  <h3 class="box-title">Agent Personal detail</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
                <form role="form" name='frmLogin'  action="add_agent" method="post" enctype="multipart/form-data">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                     				 
                  <div class="row">
                    <div class="col-xs-4">
                      <input type="text" class="form-control" id="f_name" name="f_name" placeholder="First Name*" onKeyPress="return letter(event)" maxlength="35"/>
                    </div>
                    <div class="col-xs-4">
                      <input type="text" class="form-control" placeholder="Middle Name" id="m_name" name="m_name"  onKeyPress="return letter(event)" maxlength="35"/>
                    </div>
                    <div class="col-xs-4">
                      <input type="text" class="form-control" placeholder="Last Name*" id="l_name" name="l_name" onKeyPress="return letter(event)" maxlength="35" />
                    </div>
                 
                </div><!-- /.box-body -->
                    </div>
					
					<div class="form-group">
                      <label for="exampleInputEmail1">Email ID</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" id="email" name="email" />
                    </div>
					<div class="form-group">
                    <label>Date of Birth:</label>
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <input type="date" class="form-control" name="dob" data-inputmask="'alias': 'dd/mm/yyyy'" value="1990-01-01"  data-mask>
                    </div><!-- /.input group -->
                  </div>
				  
				  <div class="form-group">
					<label for="exampleInputEmail1">Select Gender</label>                   
				   
				   <div class="form-control">
                    <div class="col-xs-3">
				 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="radio" name="gender" value="male" class="minimal-red" checked>
                    Male
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
					<div class="col-xs-4">
                    
                      <input type="radio" name="gender" value="female" class="minimal-red">
                    Female
                   	</div>
					</div>
                  </div>
				  
				  <div class="form-group">
                    <label>Nationality</label>
                    <select class="form-control select2"  style="width: 100%;" name="nationality">
                      <option Value="india" selected="selected">India</option>
                      <option Value="pakistan">Pakistan</option>
                      <option value="california">California</option>
                      <option value="delaware">Delaware</option>
                      <option value="tennessee">Tennessee</option>
                      <option value="texas">Texas</option>
                      <option value="washington"> Washington</option>
                    </select>
                  </div>
				  <div class="form-group">
                    <label>Marital status</label>
                    <select class="form-control select2" style="width: 100%;" name="m_status">
					 <option  selected="selected" value="0">Please select one</option>
                      <option  value="unmarried">Unmarried </option>
                      <option value="married">Married</option>
                      
                    </select>
                  </div>
				  <div class="form-group">
                      <label for="qualification">Highest Qualification </label>
                      <select class="form-control select2" style="width: 100%;" name="h_qualification">
					 <option  selected="selected" value="0">Please select Highest Qualification</option>
                      <option  value="Post Graduate">Post Graduate </option>
                      <option value="Graduate">Graduate</option>
					   <option  value="Intermediate">Intermediate </option>
                      <option value="High School">High School</option>
					  <option value="8th">8th</option>
					  
                      
                    </select>
                    </div>
					<div class="form-group">
                      <label for="">Registration Amount </label>
                      <input type="text" class="form-control" name="reg_amount" id="reg_amount" placeholder="Enter Amount">
                    </div>

					<div class="form-group">
                      <label for="">Father Name</label>
                      <input type="text" class="form-control" name="father_name" id="father_name" placeholder="Father Name*">
                    </div>

					<div class="form-group">
                      <label for="">Address : 1</label>
                      <input type="text" class="form-control" name="add1" id="add1" placeholder="Enter Address 1">
                    </div>
                    <div class="form-group">
                      <label for="">Address : 2</label>
                      <input type="text" class="form-control" name="add2" id="add2" placeholder="Enter Address 2">
                    </div>
                    <div class="form-group">
                      <label for="">Postal Code</label>
                      <input type="text" class="form-control" name="pincode" id="pincode" placeholder="Enter Postal code">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Contact No.</label>
                      <input type="text" class="form-control" name="contact" id="contact" placeholder="Enter Contact No." maxlength="10"/>
                    </div>
					
				 </div><!-- /.box-body -->
 
              </div><!-- /.box -->

            </div><!--/.col (right) -->
			
			 <div class="col-md-6">
              <!-- Horizontal Form -->
             
			   <div class="box box-primary">
                <div class="box-header with-border">
                  <h3 class="box-title">Official Detail</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
               
                  <div class="box-body">
				  <div class="form-group">
                      <label for="exampleInputEmail1">Nominee Name</label>
                      <input type="text" class="form-control" name="nominee_name" id="nominee_name" placeholder="Enter Nominee Name">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Nominee Age</label>
                      <input type="text" class="form-control" name="nominee_age" id="nominee_age" placeholder="Enter Age">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Nominee Relation</label>
                      <input type="text" class="form-control" name="nominee_rel" id="nominee_rel" placeholder="Relation to Nominee">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Bank A/C No.</label>
                      <input type="text" class="form-control" name="bank_acc" id="bank_acc" placeholder="Enter A/C No.">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Bank Name</label>
                      <input type="text" class="form-control" name="bank_name" id="bank_name" placeholder="Enter Bank Name">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Bank Branch</label>
                      <input type="text" class="form-control" name="bank_branch" id="bank_branch" placeholder="Enter Bank Branch">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Bank IFSC Code</label>
                      <input type="text" class="form-control" name="bank_ifsc" id="bank_ifsc" placeholder="Enter IFSC Code">
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">PAN card No.</label>
                      <input type="text" class="form-control" name="pan_card" id="pan_card" placeholder="Enter card No.">
                    </div>
					 <div class="form-group">
                    <label>Select Identity Proof</label>
                    <select class="form-control select2" style="width: 100%;" name="id_proof">
					 <option  selected="selected" value="0">Please select one</option>
                      <option  value="Voter ID Card">Voter ID Card </option>
                      <option value="Aadhar Card">Aadhar Card</option>
					   <option value="Ration Card">Ration Card</option>
					    <option value="Driving Licence">Driving Licence</option>
						
                      
                    </select>
                  </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Identity Proof Number</label>
                      <input type="text" class="form-control" name="id_proof_number" id="id_proof_number" placeholder="Enter ID Proof No">
                    </div>
					
					
					<div class="form-group">
                    <label>Joining Date:</label>
                    <div class="input-group">
                      <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                      </div>
                      <input type="date" class="form-control" name="join_date" data-inputmask="'alias': 'dd/mm/yyyy'" value="<?php echo date("Y-m-d"); ?>" data-mask>
                    </div><!-- /.input group -->
                  </div>
				  <div class="form-group" id="rank" class="page" style="">
                      <label for="">Sponsor name</label>
                    <select class="form-control select2" style="width: 100%;" name="sponsor" id="sponsor" required>
					
					
					
					
					<option  selected="selected" value="">Select Sponsor</option>					
					<?php 
		   $client=array();
		   
		   $emp_id='emp_id';
		   $f_name='f_name';
		   $m_name='m_name';
		   $l_name='l_name';
		   $sales_rank='sales_rank';
		  
		    $sql="SELECT * FROM `emp_reg` WHERE `join_post`='sales_executive' ";	
			$result=mysql_query($sql);
			$m=mysql_num_rows($result);	
	
			
				for($i=0;$i<$m;$i++)
				{
					$client[$i][0] = mysql_result($result,$i,$emp_id);
					$client1[$i][1] = mysql_result($result,$i,$f_name);
					$client2[$i][2] = mysql_result($result,$i,$m_name);
					$client3[$i][3] = mysql_result($result,$i,$l_name);
					$client4[$i][4] = mysql_result($result,$i,$sales_rank);
								
				}
		  
		    $c=count($client);
		  
		  for($i=0;$i<$c;$i++)
		  {
			  
			 echo '<option value=" '.$client[$i][0].' "> ' .$client1[$i][1].'  '.$client2[$i][2].' '.$client3[$i][3].' </option>' ; 
		  }
		   
		  
		  ?>
		   
					 </select>
                    </div>
					
		  
					
					
					
					
					
					<div class="form-group" id="rank" class="page" style="">
                      <label for="">Rank</label>
                    <select class="form-control select2" style="width: 100%;" name="sales_rank" id="sales_rank" required>
					<option  selected="selected" value="">Choose Rank</option>					
					
					

         				<?php 
		   $client=array();
		   
		   $rank_id='id';
		   $rank='rank';
		   $rank_name='rank_name';
		    $sql="SELECT * FROM `sales_rank` where `id` BETWEEN '1' AND '12'";	
			$result=mysql_query($sql);
			$m=mysql_num_rows($result);	
	
			
				for($i=0;$i<$m;$i++)
				{
					$client[$i][0] = mysql_result($result,$i,$rank_id);
					$client1[$i][1] = mysql_result($result,$i,$rank);
					$client2[$i][2] = mysql_result($result,$i,$rank_name);
								
				}
		  
		    $c=count($client);
		  
		  for($i=0;$i<$c;$i++)
		  {
			  
			 echo '<option value=" '.$client[$i][0].' "> ' .$client1[$i][1].' : '.$client2[$i][2].' </option>' ; 
		  }
		   
		  
		  ?>
					 </select>
                    </div>
					<div class="form-group">
                      <label for="exampleInputEmail1">Upload Photo</label>
                      <input type="file" class="form-control" name="photo" id="photo" />
                    </div>
			   </div><!-- /.box-body -->
     
                
              </div><!-- /.box -->
			  
			    
            </div><!--/.col (right) -->
			
			
			<div class="col-md-12">
			
			 <div class="box-footer">
			 
			 <input type="submit" id="add_agent" name="add_agent" class="btn btn-info"  value = "Submit Form" />
                    <button type="reset" class="btn btn-default pull-right">Reset Form</button>
                    </form>
                  </div><!-- /.box-footer -->
				
			
			
			</div>
			
          </div>   <!-- /.row -->
        </section><!-- /.content -->
        <!-- Main content -->
       
      </div><!-- /.content-wrapper -->

      <?php include("footer.php"); ?>
    
    </div><!-- ./wrapper -->

    <!-- jQuery 2.1.4 -->
    <script src="../plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <!-- jQuery UI 1.11.4 -->
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <!-- Slimscroll -->
    <script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="../plugins/fastclick/fastclick.min.js"></script>
    <!-- AdminLTE App -->
    <script src="../dist/js/app.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="../dist/js/demo.js"></script>
    <!-- fullCalendar 2.2.5 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="../plugins/fullcalendar/fullcalendar.min.js"></script>
    <!-- Page specific script -->
    <script>
      $(function () {

        /* initialize the external events
         -----------------------------------------------------------------*/
        function ini_events(ele) {
          ele.each(function () {

            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
              title: $.trim($(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            $(this).draggable({
              zIndex: 1070,
              revert: true, // will cause the event to go back to its
              revertDuration: 0  //  original position after the drag
            });

          });
        }
        ini_events($('#external-events div.external-event'));

        /* initialize the calendar
         -----------------------------------------------------------------*/
        //Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();
        $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          buttonText: {
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
          },
          //Random default events
          events: [
            {
              title: 'All Day Event',
              start: new Date(y, m, 1),
              backgroundColor: "#f56954", //red
              borderColor: "#f56954" //red
            },
            {
              title: 'Long Event',
              start: new Date(y, m, d - 5),
              end: new Date(y, m, d - 2),
              backgroundColor: "#f39c12", //yellow
              borderColor: "#f39c12" //yellow
            },
            {
              title: 'Meeting',
              start: new Date(y, m, d, 10, 30),
              allDay: false,
              backgroundColor: "#0073b7", //Blue
              borderColor: "#0073b7" //Blue
            },
            {
              title: 'Lunch',
              start: new Date(y, m, d, 12, 0),
              end: new Date(y, m, d, 14, 0),
              allDay: false,
              backgroundColor: "#00c0ef", //Info (aqua)
              borderColor: "#00c0ef" //Info (aqua)
            },
            {
              title: 'Birthday Party',
              start: new Date(y, m, d + 1, 19, 0),
              end: new Date(y, m, d + 1, 22, 30),
              allDay: false,
              backgroundColor: "#00a65a", //Success (green)
              borderColor: "#00a65a" //Success (green)
            },
            {
              title: 'Click for Google',
              start: new Date(y, m, 28),
              end: new Date(y, m, 29),
              url: 'http://google.com/',
              backgroundColor: "#3c8dbc", //Primary (light-blue)
              borderColor: "#3c8dbc" //Primary (light-blue)
            }
          ],
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar !!!
          drop: function (date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            copiedEventObject.backgroundColor = $(this).css("background-color");
            copiedEventObject.borderColor = $(this).css("border-color");

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove();
            }

          }
        });

        /* ADDING EVENTS */
        var currColor = "#3c8dbc"; //Red by default
        //Color chooser button
        var colorChooser = $("#color-chooser-btn");
        $("#color-chooser > li > a").click(function (e) {
          e.preventDefault();
          //Save color
          currColor = $(this).css("color");
          //Add color effect to button
          $('#add-new-event').css({"background-color": currColor, "border-color": currColor});
        });
        $("#add-new-event").click(function (e) {
          e.preventDefault();
          //Get value and make sure it is not null
          var val = $("#new-event").val();
          if (val.length == 0) {
            return;
          }

          //Create events
          var event = $("<div />");
          event.css({"background-color": currColor, "border-color": currColor, "color": "#fff"}).addClass("external-event");
          event.html(val);
          $('#external-events').prepend(event);

          //Add draggable funtionality
          ini_events(event);

          //Remove event from text input
          $("#new-event").val("");
        });
      });
    </script>
	<script type="text/javascript">
    $(function () {
        $("#join_post").change(function () {
            
            var selectedValue = $(this).val();
			 if (selectedValue== 'sales_executive') {
				 
				var divrank = document.getElementById("rank");
				
			divrank.style.display = "block";
			
			}
			
			else  {
				var divrank = document.getElementById("rank");
			
			divrank.style.display = "none";
			
			}
			
			
        });
    });
</script>
  </body>
</html>
