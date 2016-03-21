{
	{
		{
			/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
			/*global window: false, REDIPS: true */

			/* enable strict mode */
			"use strict";


			var redipsInit,		// define redipsInit variable
				save,			// save elements and their positions
				report,			// function shows subject occurring in timetable
				reportButton,	// show/hide report buttons
				showAll,		// function show all subjects in timetable
				printMessage,	// print message
				divNodeList;	// node list of DIV elements in table2 (global variable needed in report() and visibility() function)




			// redips initialization
			redipsInit = function () {

				var	rd = REDIPS.drag;			// reference to the REDIPS.drag object
				// initialization
				rd.init();
				// REDIPS.drag settings


			//	rd.dropMode = 'single';			// dragged elements can be placed only to the empty cells
				rd.dropMode = 'shift';
				rd.hover.colorTd = '#9BB3DA';	// set hover color
				rd.clone.keyDiv = true;			// enable cloning DIV elements with pressed SHIFT key
				rd.shift.animation = true;
				// prepare node list of DIV elements in table2
				divNodeList = document.getElementById('table2').getElementsByTagName('div');
				// show / hide report buttons (needed for dynamic version - with index.php)
			//	reportButton();
				// element is dropped

				/*
				rd.event.dropped = function () {
					var	objOld = rd.objOld,					// original object
						targetCell = rd.td.target,			// target cell
						targetRow = targetCell.parentNode,	// target row
						i, objNew;							// local variables

						/*
					// if checkbox is checked and original element is of clone type then clone spread subjects to the week
					if (document.getElementById('week').checked === true && objOld.className.indexOf('redips-clone') > -1) {
						// loop through table cells
						for (i = 0; i < targetRow.cells.length; i++) {
							// skip cell if cell has some content (first column is not empty because it contains label)
							if (targetRow.cells[i].childNodes.length > 0) {
								continue;
							}
							// clone DIV element
							objNew = rd.cloneObject(objOld);
							// append to the table cell
							targetRow.cells[i].appendChild(objNew);
						}



					}

					if (objOld.className.indexOf('redips-clone') > -1) {
						if (document.getElementById("nanjing_east").id == "nanjing_east") {
							for (i = 0; i < targetRow.cells.length; i++) {
								console.log(targetRow.cells[i]);
							// skip cell if cell has some content (first column is not empty because it contains label)
							if (targetRow.cells[i].childNodes.length > 0) {
								continue;
							}
							// clone DIV element
							objNew = rd.cloneObject(objOld);
							// append to the table cell
							targetRow.cells[i].appendChild(objNew);
						}
						}
					}

					// print message only if target and source table cell differ
					if (rd.td.target !== rd.td.source) {
						printMessage('Content has been changed!');
					}
					// show / hide report buttons
					reportButton();
				};

				*/

				//Test out multiple cells
				rd.event.clonedDropped = function (tc) {



							var n1 = tc.nextElementSibling,
							n2,
							objNew;

							var id_full = rd.obj.id;
							var id_substring = id_full.slice(0, id_full.length - 2);

							if (id_substring == "centurypark"|| id_substring == "thames"|| id_substring == "jmtower"|| id_substring == "qipulu"|| id_substring == "aquarium"|| id_substring == "museum" || id_substring == "thebund"||id_substring == "orientaltower") {
								if (n1) {
								n2 = n1.nextElementSibling,      // try to set reference to second cell
			          			objNew = rd.cloneObject(rd.obj); // clone itself
			          			n1.appendChild(objNew);          // append to first cell
								}

							}

			       			if (id_substring == "chongming" || id_substring == "watertown") {
			       				if (n1) {
								n2 = n1.nextElementSibling,      // try to set reference to second cell
			          			objNew = rd.cloneObject(rd.obj); // clone itself
			          			n1.appendChild(objNew);          // append to first cell

			          			if (n2) {
			          				n3 = n2.nextElementSibling,
			         		 		objNew = rd.cloneObject(rd.obj); // clone itself
			          				n2.appendChild(objNew);          // append to second cell
			       				}

			       				if (n3) {
											n4 = n3.nextElementSibling,
			       					objNew = rd.cloneObject(rd.obj); // clone itself
			          				n3.appendChild(objNew);
			       				}

										if (n4) {
			       					objNew = rd.cloneObject(rd.obj); // clone itself
			          				n4.appendChild(objNew);
			       				}
							}
			       			}

			       			if (id_substring == "disneyland") {
			       				if (n1) {
								n2 = n1.nextElementSibling,      // try to set reference to second cell
			          			objNew = rd.cloneObject(rd.obj); // clone itself
			          			n1.appendChild(objNew);          // append to first cell
			          			}
			          			if (n2) {
			          				n3 = n2.nextElementSibling,
			         		 		objNew = rd.cloneObject(rd.obj); // clone itself
			          				n2.appendChild(objNew);          // append to second cell
			       				}

			       				if (n3) {
			       					n4 = n3.nextElementSibling,
			       					objNew = rd.cloneObject(rd.obj); // clone itself
			          				n3.appendChild(objNew);
			       				}

			       				if (n4) {
											n5 = n4.nextElementSibling,
			       					objNew = rd.cloneObject(rd.obj); // clone itself
			          				n4.appendChild(objNew);
			       				}

										if (n5) {
			       					objNew = rd.cloneObject(rd.obj); // clone itself
			          				n5.appendChild(objNew);
			       				}


			       			}
			      		/*
			      		 // clone second element (if second cell exists)

			      		 if (n2) {
			         		 objNew = rd.cloneObject(rd.obj); // clone itself
			          		n2.appendChild(objNew);          // append to second cell
			       		}*/

			       		calculate();

				};

				rd.event.dropped = function() {
					calculate();
				};


				// after element is deleted from the timetable, print message
				rd.event.deleted = function () {
					console.log('Content has been deleted!');
					// show / hide report buttons
					calculate();
				};

/*
				// if any element is clicked, then make all subjects in timetable visible
				rd.event.clicked = function () {
					showAll();
				};
				*/

	};

	calculate = function() {

		var dayOnePrice = 0,
			       		dayTwoPrice = 0,
			       		dayThreePrice = 0,
			       		totalPrice = 0;



			       		var priceList = {
                			"Nanjing East": 300,
                    		"Oriental Tower": 220,
                    		"Jing An": 150,
                    		"The Bund": 85,
                    		"ChongMing": 300,
                    		"XinTianDi": 200,
                    		"Watertown": 120,
                    		"Yuyuan": 100,
                    		"Disneyland" : 599,
                    		"QiPuLu" : 300,
                    		"Aquarium" : 110,
                    		"Museum" : 60,
                    		"JinMaoTower" : 180,
                    		"CenturyPark" : 50,
                    		"ThamesTown" : 100,
            			};

						var dayOne = document.getElementById('day_one').getElementsByTagName('div'),
						dayOneLen = dayOne.length,
						dayOnePlaces = [],
						i = -1;

						while(++i < dayOneLen){
							if (dayOnePlaces.indexOf(dayOne[i].innerHTML) == -1) {
								dayOnePlaces.push(dayOne[i].innerHTML);
							}
						}

						for (key in priceList) {
							if (priceList.hasOwnProperty(key)) {
								if (dayOnePlaces.indexOf(key) > -1) {
									dayOnePrice += priceList[key];
												}
							}
						}

						document.getElementById("one").innerHTML = dayOnePrice;

						var dayTwo = document.getElementById('day_two').getElementsByTagName('div'),

						dayTwoLen = dayTwo.length,
						dayTwoPlaces = [],
						j = -1;


						while(++j < dayTwoLen){
							if (dayTwoPlaces.indexOf(dayTwo[j].innerHTML) == -1) {
								dayTwoPlaces.push(dayTwo[j].innerHTML);
							}
						}


						for (key in priceList) {
							if (priceList.hasOwnProperty(key)) {
								if (dayTwoPlaces.indexOf(key) > -1) {
									dayTwoPrice += priceList[key];
								}
							}
						}

						document.getElementById("two").innerHTML = dayTwoPrice;



						var dayThree = document.getElementById('day_three').getElementsByTagName('div'),
						dayThreeLen = dayThree.length,
						dayThreePlaces = [],
						k = -1;

						while(++k < dayThreeLen){
							if (dayThreePlaces.indexOf(dayThree[k].innerHTML) == -1) {
								dayThreePlaces.push(dayThree[k].innerHTML);
							}
						}

						for (key in priceList) {
							if (priceList.hasOwnProperty(key)) {
								if (dayThreePlaces.indexOf(key) > -1) {
									dayThreePrice += priceList[key];
								}
							}
						}

						document.getElementById("three").innerHTML = dayThreePrice;

						

						totalPrice = dayOnePrice + dayTwoPrice + dayThreePrice;

						document.getElementById("total").innerHTML = totalPrice;
	}

	changeCalculation = function() {
		console.log("test 1 : " + document.getElementById("test1").innerHTML);
		console.log("test 2 : " + document.getElementById("test2").innerHTML);
	}

			// save elements and their positions
			save = function () {
				// scan timetable content
				var content = REDIPS.drag.saveContent('table2');
				// and save content
				window.location.href = 'db_save.php?' + content;
			};

/*
			// function shows subject occurring in timetable
			report = function (subject) {
					// define day and time labels
				var day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
					time = ['08:00', '10:00', '12:00', '14:00',
					        '16:00', '18:00', '20:00', '22:00'],
					div = [],	// define array
					cellIndex,	// cell index
					rowIndex,	// row index
					id,			// element id
					i,			// loop variable
					num = 0,	// number of found subject
					str = '';	// result string
				// show all elements
				showAll();
				// create array from node list (node list is global variable)
				for (i = 0; i < divNodeList.length; i++) {
					div[i] = divNodeList[i];
				}
				// sort div elements by the cellIndex (days in week) and rowIndex (hours)
				div.sort(function (a, b) {
					var a_ci = a.parentNode.cellIndex,				// a element cell index
						a_ri = a.parentNode.parentNode.rowIndex,	// a element row index
						b_ci = b.parentNode.cellIndex,				// b element cell index
						b_ri = b.parentNode.parentNode.rowIndex;	// b element row index
					return a_ci * 100 + a_ri - (b_ci * 100 + b_ri);
				});
				// loop goes through all collected elements
				for (i = 0; i < div.length; i++) {
					// define only first two letters of ID
					// (cloned elements have appended c1, c2, c3 ...)
					id = div[i].id.substr(0, 2);
					// if id is equal to the passed subject then we have a match
					if (id === subject) {
						// define cell index
						cellIndex = div[i].parentNode.cellIndex;
						// table row is parent element of table cell
						rowIndex = div[i].parentNode.parentNode.rowIndex;
						// add line with found element
						str += day[cellIndex - 1] + '\t\t' + time[rowIndex - 1] + '\n';
						// increase counter
						num++;
					}
					// other elements should be hidden
					else {
						div[i].style.visibility = 'hidden';
					}
				}
				// if "Show report" is checked then show message
				if (document.getElementById('report').checked === true) {
					alert('Number of found subjects: ' + num + '\n' + str);
				}
			};


			// show/hide report buttons
			reportButton = function () {
				var	id,			// element id
					i,			// loop variable
					count,		// number of subjects in timetable
					style,		// hidden or visible
					// prepare subjects
					subject = {'en': 0, 'ph': 0, 'ma': 0, 'bi': 0, 'ch': 0, 'it': 0, 'ar': 0, 'hi': 0, 'et': 0};
				// loop goes through all collected elements
				for (i = 0; i < divNodeList.length; i++) {
					// define only first two letters of ID
					// (cloned elements have appended c1, c2, c3 ...)
					id = divNodeList[i].id.substr(0, 2);
					// increase subject occurring
					subject[id]++;
				}
				// loop through subjects
				for (i in subject) {
					// using the hasOwnProperty method to distinguish the true members of the object
					if (subject.hasOwnProperty(i)) {
						// prepare id of the report button
						id = 'b_' + i;
						// subject count on the timetable
						count = subject[i];
						if (count === 0) {
							style = 'hidden';
						}
						else {
							style = 'visible';
						}
						// hide or show report button
						document.getElementById(id).style.visibility = style;
					}
				}
			};


			// print message
			printMessage = function (message) {
				document.getElementById('message').innerHTML = message;
			};


			// function show all subjects in timetable
			showAll = function () {
				var	i; // loop variable
				for (i = 0; i < divNodeList.length; i++) {
					divNodeList[i].style.visibility = 'visible';
				}
			};

			*/


			// add onload event listener
			if (window.addEventListener) {
				window.addEventListener('load', redipsInit, false);
			}
			else if (window.attachEvent) {
				window.attachEvent('onload', redipsInit);
			}
	}

	}
}
