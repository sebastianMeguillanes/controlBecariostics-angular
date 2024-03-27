import { Component, OnInit } from '@angular/core';
import { TareaService } from './tarea.service';

interface Becario {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent implements OnInit {
  fechaHora: string | null = null;
  selectedBecario: number | null = null;
  descripcion: string = '';
  lugar: string = '';
  file: File | null = null;

  becarios: Becario[] = [
    { id: 1, nombre: "Sebas" },
    { id: 2, nombre: "Valeria" },
  ];

  constructor(private tareaService: TareaService) { }

  ngOnInit() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Los meses en JavaScript empiezan en 0
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    this.fechaHora = `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`;
  }

  onSubmit() {

    console.log(this.fechaHora);
    const formData = new FormData();
    formData.append('becario', String(this.selectedBecario));
    formData.append('descripcion', this.descripcion);
    formData.append('fecha', this.fechaHora || ''); // Provide a default value for fechaHora
    formData.append('lugar', this.lugar);
    if (this.file) {
      formData.append('foto', this.file);
    }

    this.tareaService.crearTarea(formData).subscribe(
      response => {
        console.log('Tarea creada exitosamente:', response);
      },
      error => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0] as File;
  }

  onBecarioChange(event: any) {
    this.selectedBecario = event.target.value; // Update on selection change
  }
}
